import TurnAction from "../../../models/turn-action";
import Command from "../../../user-commands/command";
import UserCommand from "../../../user-commands/user-command";
import MoveCommand from "../../../user-commands/move-command";
import SaveLoadCommand from "../../../user-commands/save-load-command";
import getGameEngine from "../../../controllers/game-engine-provider";
import GameEngine from "../../../controllers/game-engine";

let selectedDiv: HTMLDivElement | null;

function movePiece(event: MouseEvent): void {
  let currentDiv = event.currentTarget as HTMLDivElement;

  if (selectedDiv == null) {
    selectedDiv = currentDiv;
  } else {
    //create a turn action
    let from = getContainerID(selectedDiv);
    let to = getContainerID(currentDiv);
    let cmd = new MoveCommand(new TurnAction(from, to));
    getGameEngine().performUserAction(cmd);
    selectedDiv = null;
  }
}

function getContainerID(div: HTMLDivElement): number | string {
  if (div.classList.contains("jail")) {
    return "jail";
  } else if (div.classList.contains("home")) {
    return "home";
  } else {
    let ret = Number(div.id);
    if (isNaN(ret)) {
      throw Error("Invalid container id format\n");
    }
    return ret;
  }
}

function saveGame(saveName: string): void {
  let cmd = new SaveLoadCommand(Command.Save, saveName);
  getGameEngine().performUserAction(cmd);
}

function loadGame(saveName: string): void {
  let cmd = new SaveLoadCommand(Command.Load, saveName);
  getGameEngine().performUserAction(cmd);
}

function changeTurn(): void {
  let cmd = new UserCommand(Command.ChangeTurn);
  getGameEngine().performUserAction(cmd);
}

function roll(): void {
  let cmd = new UserCommand(Command.Roll);
  getGameEngine().performUserAction(cmd);
}

function endGame(): void {
  let cmd = new UserCommand(Command.Roll);
  getGameEngine().performUserAction(cmd);
}

function populateCommands(): void {
  document
    .querySelectorAll<HTMLDivElement>(".piece-container")
    .forEach((div) => {
      div.addEventListener("click", movePiece);
    });

  document.getElementById("dice")?.addEventListener("click", roll);

  document.getElementById("change-turn")?.addEventListener("click", changeTurn);

  document.getElementById("end-game")?.addEventListener("click", endGame);

  /*
  document
    .getElementById("load-game")
    ?.addEventListener("click", loadGame("testSave"));

  document
    .getElementById("save-game")
    ?.addEventListener("click", saveGame("testSave"));
*/
}

export { populateCommands };
