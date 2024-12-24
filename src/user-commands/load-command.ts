import Command from "./command";
import UserCommand from "./user-command";

class LoadCommand extends UserCommand {
  board: Board;

  constructor(board: Board) {
    super(Command.Load);
    this.board = board;
  }
}

export default LoadCommand;
