import TurnAction from "../../../models/turn-action";
import Command from "../../../user-commands/command";
import UserCommand from "../../../user-commands/user-command";
import MoveCommand from "../../../user-commands/move-command";
import SaveLoadCommand from "../../../user-commands/save-load-command";
import getGameEngine from "../../../controllers/game-engine-provider";
import GameEngine from "../../../controllers/game-engine";
import { handleError } from "./handle-error";

let selectedDiv: HTMLDivElement | null;

function movePiece(event: MouseEvent): void {
  try {
    let currentDiv = event.currentTarget as HTMLDivElement;

    if (selectedDiv == null) {
      selectedDiv = currentDiv;
      selectedDiv.classList.add("highlighted");
    } else {
      //create a turn action
      let from = getContainerID(selectedDiv);
      let to = getContainerID(currentDiv);
      let cmd = new MoveCommand(new TurnAction(from, to));
      getGameEngine().performUserAction(cmd);
      selectedDiv.classList.remove("highlighted");
      selectedDiv = null;
    }
  } catch (err) {
    if (err instanceof Error) handleError(err);
  }
}

function getContainerID(div: HTMLDivElement): number | string {
  if (div.classList.contains("jail")) {
    return "jail";
  } else if (div.classList.contains("home")) {
    return "home";
  } else {
    let id = div.id;
    let ret = Number(id.charAt(id.length - 1));
    if (isNaN(ret)) {
      throw Error("Invalid container id format\n");
    }
    return ret;
  }
}

function saveGame(saveName: string): void {
  try {
    let cmd = new SaveLoadCommand(Command.Save, saveName);
    getGameEngine().performUserAction(cmd);
  } catch (err) {
    if (err instanceof Error) displayError(err);
  }
}

function loadGame(saveName: string): void {
  try {
    let cmd = new SaveLoadCommand(Command.Load, saveName);
    getGameEngine().performUserAction(cmd);
  } catch (err) {
    if (err instanceof Error) displayError(err);
  }
}

function changeTurn(): void {
  try {
    let cmd = new UserCommand(Command.ChangeTurn);
    getGameEngine().performUserAction(cmd);
  } catch (err) {
    if (err instanceof Error) displayError(err);
  }
}

function roll(): void {
  try {
    let cmd = new UserCommand(Command.Roll);
    getGameEngine().performUserAction(cmd);
  } catch (err) {
    if (err instanceof Error) displayError(err);
  }
}

function endGame(): void {
  try {
    let cmd = new UserCommand(Command.Roll);
    getGameEngine().performUserAction(cmd);
  } catch (err) {
    if (err instanceof Error) displayError(err);
  }
}

function populateCommands(): void {
  document
    .querySelectorAll<HTMLDivElement>(".piece-container")
    .forEach((div) => {
      div.addEventListener("click", movePiece);
    });

  document.getElementById("roll-dice")?.addEventListener("click", roll);

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
