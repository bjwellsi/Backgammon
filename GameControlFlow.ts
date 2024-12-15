import Board from "./Models/Board";
import ConsoleView from "./Views/ConsoleView";
import Storage from "./Storage";
import TurnAction from "./Models/TurnAction";

class GameControlFlow {
  board: Board;
  view: ConsoleView;
  storage: Storage;

  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
    this.storage = new Storage();
  }

  async performUserAction(
    command: string | TurnAction,
  ): Promise<string | void> {
    if (command === "game") {
      //just going to return the command to the outer loop for now, let it handle ending the loop
      //putting it in here so that none of the command processing happens outside this method
      //right now there's no processing to really do on this command though
      return command;
    } else if (command === "roll") {
      //will throw an error if you've already rolled this turn
      this.board.rollDice();
    } else if (command === "turn") {
      //should end the turn. for now we'll just end it no matter what, instead of checking whether there are moves left
      this.board.clearDice("team");
      this.board.changeTurn();
    } else if (command === "save") {
      //save the game
      throw Error("not implemented");
      //await this.storage.save(this.board);
    } else if (command === "load") {
      //load the save game, for now only one save allowed
      throw Error("not implemented");
      //this.board = await this.storage.load();
    } else {
      //assume that we've gotten a move back
      this.board.processTurnAction(command);
    }
  }

  async playGame(): Promise<void> {
    let winner = this.board.winner;
    while (winner === undefined) {
      this.view.reloadObject(this.board);
      try {
        let command = await this.view.processInput();
        if (command != "nothing") {
          if ((await this.performUserAction(command)) == "game") {
            winner = "nobody";
          }
        }
      } catch (error) {
        this.view.processError(error);
      }
    }

    this.view.declareWinner(winner);
  }
}

export default GameControlFlow;
