import Readline from "readline";
import TurnAction from "./Models/TurnAction.js";

class ConsoleView {
  constructor() {}

  async consoleInput(question) {
    let readLine = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    return new Promise((resolve) => {
      readLine.question(question, (input) => {
        resolve(input);
        readLine.close();
      });
    });
  }

  consoleOutput(message) {
    console.log(message);
  }

  reloadObject(object) {
    console.log(object.renderInConsole());
  }

  processError(error) {
    this.consoleOutput(error);
  }

  async processInput() {
    let command = await this.consoleInput(
      "Type your next command. Type h for help\n",
    );
    //this is just going to return a string w/the command or the move that we wanna make
    //I don't like this strategy, feels like I should define an "action" class
    //but I don't have a particular need rn, and js === lets us do this
    if (command == "END GAME") {
      return "game";
    } else if (command == "h") {
      this.consoleOutput(
        "\nType a standard move as #,# to indicate the columns you'd like to move from and to\n\n" +
          "For example, 6,3 would move a piece from column 6 to column 3, hitting in the process if 3 is occupied by the opponent\n\n" +
          "To move home, simply type #,home - EX: 4,home\n\n" +
          "If you're in jail, type jail,# - EX: jail,22\n\n" +
          "Type r to roll the dice\n\n" +
          "Type t to end your turn\n\n" +
          "Type END GAME to end the game\n\n" +
          "Type s to save the game\n\n" +
          "Type LOAD to load the most recent save game\n\n",
      );
      return "nothing";
    } else if (command == "r") {
      return "roll";
    } else if (command == "t") {
      return "turn";
    } else if (command == "s") {
      return "save";
    } else if (command == "LOAD") {
      return "load";
    } else {
      return this.processMove(command);
    }
  }

  async processMove(move) {
    let turnAction = null;
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

  indexFromString(stringIndex) {
    return parseInt(stringIndex, 10) - 1;
  }

  declareWinner(winner) {
    this.consoleOutput(`Congrats ${winner}, you won!\n`);
  }
}

export default ConsoleView;
