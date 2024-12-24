import { deleteSave, listSaves } from "../../../controllers/save-game";

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

export { displaySaves };
