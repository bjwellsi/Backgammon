import Board from "./models/board";
import ConsoleView from "./views/console-view";
import SaveGame from "./save-game";
import TurnAction from "./models/turn-action";
import UserCommand from "./views/user-command";
import Command from "./views/command";
import MoveCommand from "./views/move-command";
import SaveLoadCommand from "./views/save-load-command";

class GameControlFlow {
  board: Board;
  view: ConsoleView;
  saveGame: SaveGame;

  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
    this.saveGame = new SaveGame();
  }

  async performUserAction(command: UserCommand): Promise<string | void> {
    if (command.command == Command.None) {
      //do nothing.
      return;
    } else if (command.command == Command.EndGame) {
      //just going to return the command to the outer loop for now, let it handle ending the loop
      //putting it in here so that none of the command processing happens outside this method
      //right now there's no processing to really do on this command though
      return "end";
    } else if (command.command == Command.Roll) {
      //will throw an error if you've already rolled this turn
      this.board.rollDice();
    } else if (command.command == Command.ChangeTurn) {
      //should end the turn. for now we'll just end it no matter what, instead of checking whether there are moves left
      this.board.clearDice("team");
      this.board.changeTurn();
    } else if (command.command == Command.Save) {
      //save the game
      if (command instanceof SaveLoadCommand) {
        await this.saveGame.saveBoard(this.board, command.saveId);
      } else {
        throw Error("Can't save on a non save comman\n");
      }
    } else if (command.command == Command.Load) {
      //load the save game
      if (command instanceof SaveLoadCommand) {
        this.board = await this.saveGame.loadBoard(command.saveId);
      } else {
        throw Error("Can't load on a non load command\n");
      }
    } else if (command.command == Command.Move) {
      //assume that we've gotten a move back
      if (command instanceof MoveCommand) {
        this.board.processTurnAction(command.turnAction);
      } else {
        throw Error("Can't mave a move without specifying the move\n");
      }
    }
  }

  async playGame(): Promise<void> {
    let winner = this.board.winner;
    while (winner === undefined) {
      this.view.reloadObject(this.board);
      try {
        let command = await this.view.processInput();
        if ((await this.performUserAction(command)) == "game") {
          winner = "NOBODY";
          break;
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
