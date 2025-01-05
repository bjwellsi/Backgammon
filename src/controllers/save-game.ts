import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";

function saveSomeBoard(board: Board, saveName: string) {
  let content = serialize(board);
  localStorage.setItem(saveName, content);
}

function saveBoard(saveName: string): void {
  //saveSomeBoard(getBoard(), saveName);
  console.log("todo");
}

function loadBoard(saveName: string): Board | null {
  let content = localStorage.getItem(saveName);
  let board = null;
  if (content) {
    board = deserialize(Board, content);
  }
  return board;
}

function genSaveName(prefix: string): void {
  let saves = listSaves();
  let saveName;
  let i = 0;
  while (!saveName) {
    let newName = `${prefix}${i}`;
    if (saves.indexOf(newName) < 0) {
      saveName = newName;
    }
    i++;
  }
  saveBoard(saveName);
}

function manualSave(): void {
  genSaveName("Save ");
}

function autoSave(): void {
  saveBoard("auto");
}

function loadAutoSave(): Board | null {
  return loadBoard("auto");
}

function renameSave(save: string, newName: string): void {
  let saveVal = loadBoard(save);
  if (!saveVal) {
    throw Error("Save doesn't exist\n");
  }
  deleteSave(save);
  saveSomeBoard(saveVal, newName);
}

function listSaves(): string[] {
  let saves = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key && key != "auto") {
      saves.push(key);
    }
  }
  return saves;
}

function deleteSave(save: string): void {
  localStorage.removeItem(save);
}

function changeSaveName(save: string, newName: string): void {
  let saveData = loadBoard(save);
  if (saveData instanceof Board) {
    deleteSave(save);
    saveSomeBoard(saveData, newName);
  }
}

export {
  saveBoard,
  loadBoard,
  listSaves,
  deleteSave,
  changeSaveName,
  manualSave,
  autoSave,
  loadAutoSave,
  renameSave,
};
