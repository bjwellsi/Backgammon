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
      li.textContent = save;
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteSave(save);
        saves.removeChild(li);
      });
      li.appendChild(deleteBtn);
      saves.appendChild(li);
    }
  }
}

function makeNewSave(): void {
  newSave();
  displayBoard();
}

function loadGame(): void {
  let board = loadBoard("Save1");
  if (!board) {
    throw Error("No board loaded\n");
  }
  updateBoard(board);
  displayBoard();
}

function populateSaveFunctions() {
  displaySaves();

  document.getElementById("load-game")?.addEventListener("click", loadGame);

  document.getElementById("new-save")?.addEventListener("click", makeNewSave);
}

export { populateSaveFunctions };
