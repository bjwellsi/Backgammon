import Command from "./command";
import UserCommand from "./user-command";

class SaveLoadCommand extends UserCommand {
  saveId: string;

  constructor(command: Command, saveId: string | undefined) {
    if (command != Command.Save && command != Command.Load) {
      throw Error("Invalid command type\n");
    }
    super(command);
    if (saveId == undefined) {
      saveId = "save"; //default file for now
    }
    this.saveId = saveId;
  }
}

export default SaveLoadCommand;
