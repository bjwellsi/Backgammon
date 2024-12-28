import TurnAction from "../models/turn-action";
import { resetBoard } from "../controllers/board-provider";
import { rollDice, nextTurn, movePiece } from "../controllers/game-engine";
import { autoSave, loadAutoSave } from "../controllers/save-game";

let selectedDiv: HTMLDivElement | null;

function move(event: MouseEvent): void {
  let currentDiv = event.currentTarget as HTMLDivElement;

  if (selectedDiv == null) {
    selectedDiv = currentDiv;
    selectedDiv.classList.add("highlighted");
  } else {
    //create a turn action
    let from = getContainerID(selectedDiv);
    let to = getContainerID(currentDiv);
    let action = new TurnAction(from, to);
    selectedDiv.classList.remove("highlighted");
    selectedDiv = null;
    movePiece(action);
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

function changeTurn(): void {
  nextTurn();
  autoSave();
}

function roll(): void {
  rollDice();
  autoSave();
}

function endGame(): void {
  resetBoard();
}

function populateCommands(): void {
  document
    .querySelectorAll<HTMLDivElement>(".piece-container")
    .forEach((div) => {
      div.addEventListener("click", move);
    });

  document.getElementById("roll-dice")?.addEventListener("click", roll);

  document.getElementById("change-turn")?.addEventListener("click", changeTurn);

  document.getElementById("end-game")?.addEventListener("click", endGame);
}

export { populateCommands };
