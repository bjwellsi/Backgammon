import Board from "./models/board";
import ConsoleView from "./views/console-view";
import SaveGame from "./save-game";
import TurnAction from "./models/turn-action";

class GameControlFlow {
  board: Board;
  view: ConsoleView;
  saveGame: SaveGame;

  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
    this.saveGame = new SaveGame();
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
      await this.saveGame.saveBoard(this.board, "save.json");
    } else if (command === "load") {
      //load the save game, for now only one save allowed
      this.board = await this.saveGame.loadBoard("save.json");
    } else if (command instanceof TurnAction) {
      //assume that we've gotten a move back
      this.board.processTurnAction(command as TurnAction);
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
            winner = "NOBODY";
            break;
          }
        }
      } catch (error) {
        this.view.processError(error);
      }
      winner = this.board.winner;
    }

    this.view.declareWinner(winner);
  }
}

export default GameControlFlow;
