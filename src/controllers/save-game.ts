import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";

function saveBoard(board: Board, saveName: string) {
  let content = serialize(board);
  localStorage.setItem(saveName, content);
}

function loadBoard(saveName: string): Board | null {
  let content = localStorage.getItem(saveName);
  let board = null;
  if (content) {
    board = deserialize(Board, content);
  }
  return board;
}

function genSaveName(prefix: string): string {
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
  return saveName;
}

function manualSave(board: Board): void {
  let saveName = genSaveName("Save ");
  saveBoard(board, saveName);
}

function autoSave(board: Board): void {
  saveBoard(board, "auto");
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
  saveBoard(saveVal, newName);
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

export {
  saveBoard,
  loadBoard,
  listSaves,
  deleteSave,
  manualSave,
  autoSave,
  loadAutoSave,
  renameSave,
};
