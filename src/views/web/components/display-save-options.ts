import getGameEngine from "../../../controllers/game-engine-provider";
import { listSaves } from "../../../controllers/save-game";

function displaySaves() {
  let saves = document.getElementById("save-names");
  if (saves) {
    saves.innerHTML = "";
    let engine = getGameEngine();
    let saveList = listSaves();
    for (let save of saveList) {
      let li = document.createElement("li");
      li.textContent = save;
      saves.appendChild(li);
    }
  }
}

export { displaySaves };
