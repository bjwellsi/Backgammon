import TurnAction from "../models/turn-action";
import Command from "./command";
import UserCommand from "./user-command";

class MoveCommand extends UserCommand {
  turnAction: TurnAction;
  constructor(turnAction: TurnAction) {
    super(Command.Move);
    this.turnAction = turnAction;
  }
}

export default MoveCommand;
