import Readline from "readline";
import TurnAction from "./Models/TurnAction.js";

class ConsoleView {
  constructor() {}

  async consoleInput(question) {
    let readLine = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
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

  async processError(error) {
    this.consoleOutput(error);
  }

  async retrieveNextMove() {
    let turnAction = null;
    let homeRegex = /^\d+,home$/;
    let jailRegex = /^\jail,\d+$/;
    let standardRegex = /^\d+,\d+$/;
    let userResponse = await this.consoleInput(
      "Please type your next move. Type h for help\n",
    );
    if (userResponse == "h") {
      this.consoleOutput(
        "Type a standard move as #,# to indicate the columns you'd like to move from and to\n\n" +
          "For example, 6,3 would move a piece from column 6 to column 3, hitting in the process if 3 is occupied by the opponent\n\n" +
          "To move home, simply type #,home - EX: 4,home\n\n" +
          "If you're in jail, type jail,# - EX: jail,22\n\n",
      );
    } else {
      if (homeRegex.test(userResponse)) {
        //parse the first into
        turnAction = new TurnAction(
          this.indexFromString(userResponse.split(",")[0]),
          "home",
        );
      } else if (jailRegex.test(userResponse)) {
        //parse out the second int
        turnAction = new TurnAction(
          "jail",
          this.indexFromString(userResponse.split(",")[1]),
        );
      } else if (standardRegex.test(userResponse)) {
        //parse both ints
        let responseMap = userResponse.split(",").map(this.indexFromString);
        turnAction = new TurnAction(responseMap[0], responseMap[1]);
      } else {
        //bad format
        this.consoleOutput(
          "Invalid request, type h if you need help with formatting\n",
        );
      }
    }
    return turnAction;
  }

  indexFromString(stringIndex) {
    return parseInt(stringIndex, 10) - 1;
  }

  async requestDiceRoll() {
    await this.consoleInput("Press any key to roll\n");
  }

  async endTurn() {
    await this.consoleInput("Press any key to continue\n");
  }

  async gameOver(winner) {
    await this.consoleInput(
      `Congrats ${winner}, you won!\n Hit any key to play again\n`,
    );
  }
}

export default ConsoleView;
