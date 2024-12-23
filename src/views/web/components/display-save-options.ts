import getGameEngine from "../../../controllers/game-engine-provider";

function displaySaves() {
  let saves = document.getElementById("save-names");
  if (saves) {
    saves.innerHTML = "";
    let engine = getGameEngine();
    for (let save of engine.saveGame.listSaves()) {
      let li = document.createElement("li");
      li.textContent = save;
      saves.appendChild(li);
    }
  }
}

export { displaySaves };
