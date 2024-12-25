import { getBoard, updateBoard } from "../../../controllers/board-provider";
import {
  deleteSave,
  listSaves,
  loadBoard,
  newSave,
} from "../../../controllers/save-game";
import { displayBoard } from "./display-board";

function displaySaves() {
  let saves = document.getElementById("save-names");
  if (saves) {
    saves.innerHTML = "";
    let saveList = listSaves();
    for (let save of saveList) {
      let li = document.createElement("li");
      let loadBtn = document.createElement("button");
      loadBtn.textContent = save;
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Save";
      deleteBtn.addEventListener("click", () => {
        deleteSave(save);
        saves.removeChild(li);
      });
      loadBtn.addEventListener("click", () => {
        loadGame(save);
      });
      li.appendChild(loadBtn);
      li.appendChild(deleteBtn);
      saves.appendChild(li);
    }
  }
}

function makeNewSave(): void {
  newSave();
  displayBoard();
}

function loadGame(save: string): void {
  let board = loadBoard(save);
  if (!board) {
    throw Error("No board loaded\n");
  }
  updateBoard(board);
  displayBoard();
}

function populateSaveFunctions() {
  displaySaves();

  document.getElementById("new-save")?.addEventListener("click", makeNewSave);
}

export { populateSaveFunctions };
