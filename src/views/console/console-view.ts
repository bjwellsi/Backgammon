import Readline from "readline";
import TurnAction from "../../models/turn-action";
import RendersInConsole from "../../models/renders-in-console";
import Command from "../../user-commands/command";
import UserCommand from "../../user-commands/user-command";
import MoveCommand from "../../user-commands/move-command";
import SaveLoadCommand from "../../user-commands/save-load-command";

class ConsoleView {
  constructor() {}

  async consoleInput(question: string): Promise<string> {
    let readLine = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    return new Promise((resolve) => {
      readLine.question(question, (input: string) => {
        resolve(input);
        readLine.close();
      });
    });
  }

  consoleOutput(message: string): void {
    console.log(message);
  }

  reloadObject(object: RendersInConsole): void {
    console.log(object.renderInConsole());
  }

  processError(error: unknown): void {
    if (error instanceof Error) {
      this.consoleOutput(`${error.stack}`);
    } else this.consoleOutput(error as string);
  }

  async processInput(): Promise<UserCommand> {
    let commands = await this.consoleInput(
      "Type your next command. Type h for help\n",
    );
    let args = commands.split(" ");
    let command = args[0];

    if (command == "ENDGAME") {
      return new UserCommand(Command.EndGame);
    } else if (command == "h") {
      this.consoleOutput(
        "\nType a standard move as #,# to indicate the columns you'd like to move from and to\n\n" +
          "For example, 6,3 would move a piece from column 6 to column 3, hitting in the process if 3 is occupied by the opponent\n\n" +
          "To move home, simply type #,home - EX: 4,home\n\n" +
          "If you're in jail, type jail,# - EX: jail,22\n\n" +
          "Type r to roll the dice\n\n" +
          "Type t to end your turn\n\n" +
          "Type ENDGAME to end the game\n\n" +
          "To save or load the game, type s or LOAD\n" +
          "To name your savefile, type s or LOAD, followed by the filenamen\n",
      );
      return new UserCommand(Command.None);
    } else if (command == "r") {
      return new UserCommand(Command.Roll);
    } else if (command == "t") {
      return new UserCommand(Command.ChangeTurn);
    } else if (command == "s") {
      //parse the save location
      return new SaveLoadCommand(Command.Save, args[1]);
    } else if (command == "LOAD") {
      //parse the load location
      return new SaveLoadCommand(Command.Load, args[1]);
    } else {
      let action = await this.processMove(command);
      return new MoveCommand(action);
    }
  }

  async processMove(move: string): Promise<TurnAction> {
    let turnAction: TurnAction | null;
    let homeRegex = /^\d+,home$/;
    let jailRegex = /^\jail,\d+$/;
    let standardRegex = /^\d+,\d+$/;
    if (homeRegex.test(move)) {
      //parse the first into
      turnAction = new TurnAction(
        this.indexFromString(move.split(",")[0]),
        "home",
      );
    } else if (jailRegex.test(move)) {
      //parse out the second int
      turnAction = new TurnAction(
        "jail",
        this.indexFromString(move.split(",")[1]),
      );
    } else if (standardRegex.test(move)) {
      //parse both ints
      let responseMap = move.split(",").map(this.indexFromString);
      turnAction = new TurnAction(responseMap[0], responseMap[1]);
    } else {
      //bad format
      throw Error("Invalid request, type h if you need help with formatting\n");
    }
    return turnAction;
  }

  indexFromString(stringIndex: string): number {
    return parseInt(stringIndex, 10) - 1;
  }

  declareWinner(winner: string): void {
    this.consoleOutput(`Congrats ${winner}, you won!\n`);
  }
}

export default ConsoleView;
