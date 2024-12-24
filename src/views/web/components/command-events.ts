import TurnAction from "../../../models/turn-action";
import Command from "../../../user-commands/command";
import UserCommand from "../../../user-commands/user-command";
import MoveCommand from "../../../user-commands/move-command";
import getGameEngine from "../../../controllers/game-engine-provider";
import { loadBoard, newSave } from "../../../controllers/save-game";
import LoadCommand from "../../../user-commands/load-command";

let selectedDiv: HTMLDivElement | null;

function movePiece(event: MouseEvent): void {
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
}

function getContainerID(div: HTMLDivElement): number | string {
  if (div.classList.contains("jail")) {
    return "jail";
  } else if (div.classList.contains("home")) {
    return "home";
  } else {
    let id = div.id;
    let ret = Number(id.replace("column-", ""));
    if (isNaN(ret)) {
      throw Error("Invalid container id format\n");
    }
    return ret;
  }
}

function makeNewSave(): void {
  newSave(getGameEngine().board);
}

function loadGame(): void {
  //todo
  let cmd = new LoadCommand(loadBoard("Save1"));
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
  let cmd = new UserCommand(Command.EndGame);
  getGameEngine().performUserAction(cmd);
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

  document.getElementById("load-game")?.addEventListener("click", loadGame);

  document.getElementById("new-save")?.addEventListener("click", makeNewSave);
}

export { populateCommands };
