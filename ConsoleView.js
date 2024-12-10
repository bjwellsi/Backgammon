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

  async getNextMove() {
    let turnAction = null;
    let homeRegex = /^\d+,home$/;
    let jailRegex = /^\jail,d+$/;
    let standardRegex = /^\d+,d+$/;
    while (turnAction == null) {
      let userResponse = await this.consoleInput(
        "Please type your next move. Type h for help\n",
      );
      if (userResponse == "h") {
        this.consoleOutput(
          "Type a standard move as #,# to indicate the columns you'd like to move from and to\n" +
            "For example, 6,3 would move a piece from column 6 to column 3, hitting in the process if 3 is occupied by the opponent\n" +
            "To move home, simply type #,home - EX: 4,home\n" +
            "If you're in jail, type jail,# - EX: jail,22\n",
        );
      } else {
        if (homeRegex.test(userResponse)) {
          //parse the first into
          turnAction = new TurnAction(
            parseInt(userResponse.split(",")[0], 10),
            "home",
          );
        } else if (jailRegex.test(userResponse)) {
          //parse out the second int
          turnAction = new TurnAction(
            "jail",
            parseInt(userResponse.split(",")[0], 10),
          );
        } else if (standardRegex.test(userResponse)) {
          //parse both ints
          let responseMap = parseInt(userResponse.split(",")[0], 10);
          turnAction = new TurnAction(responseMap[0], responseMap[1]);
        } else {
          //bad format
          this.consoleOutput(
            "Invalid request, type h if you need help with formatting\n",
          );
        }
      }
    }
    return turnAction;
  }

  async requestDiceRoll() {
    await consoleInput("Press any key to roll\n");
  }

  async gameOver(winner) {
    await this.consoleInput(
      `Congrats ${winner}, you won!\n Hit any key to play again\n`,
    );
  }
}

export default ConsoleView;
