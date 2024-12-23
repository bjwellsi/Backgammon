import Board from "../models/board";
import { displayBoard } from "../views/web/components/display-board";
import SaveGame from "./save-game";
import UserCommand from "../user-commands/user-command";
import Command from "../user-commands/command";
import MoveCommand from "../user-commands/move-command";
import SaveLoadCommand from "../user-commands/save-load-command";

class GameEngine {
  board: Board;
  saveGame: SaveGame;

  constructor() {
    this.board = new Board();
    this.saveGame = new SaveGame();
  }

  async performUserAction(command: UserCommand): Promise<string | void> {
    if (command.command == Command.None) {
      //do nothing.
      return;
    } else if (command.command == Command.EndGame) {
      this.board = new Board();
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
        this.saveGame.saveBoard(this.board, command.saveId);
      } else {
        throw Error("Can't save on a non save command\n");
      }
    } else if (command.command == Command.Load) {
      //load the save game
      if (command instanceof SaveLoadCommand) {
        let board = this.saveGame.loadBoard(command.saveId);
        if (board) {
          this.board = board;
        }
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
    displayBoard(this.board);
  }
}

export default GameEngine;
