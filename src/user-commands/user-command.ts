import Command from "./command";

class UserCommand {
  command: Command;
  constructor(command: Command) {
    this.command = command;
  }
}

export default UserCommand;
