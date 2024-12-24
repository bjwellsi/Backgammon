import { serialize, deserialize } from "class-transformer";
import Board from "../models/board";

function saveBoard(board: Board, saveName: string): void {
  //very basic default behavior for now
  let content = serialize(board);
  localStorage.setItem(saveName, content);
}

function loadBoard(saveName: string): Board | null {
  //very basic default behavior for now
  let content = localStorage.getItem(saveName);
  let board = null;
  if (content) {
    board = deserialize(Board, content);
  }
  return board;
}

function newSave(board: Board): void {
  let saves = listSaves();
  let saveName;
  let i = 0;
  while (!saveName) {
    let newName = `Save${i}`;
    if (saves.indexOf(newName) < 0) {
      saveName = newName;
    }
  }
  saveBoard(board, saveName);
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
    if (key) {
      saves.push(key);
    }
  }
  return saves;
}

function deleteSave(save: string): void {
  localStorage.removeItem(save);
}

function deleteAllSaves(): void {
  localStorage.clear();
}

function changeSaveName(save: string, newName: string): void {
  let saveData = loadBoard(save);
  if (saveData instanceof Board) {
    deleteSave(save);
    saveBoard(saveData, newName);
  }
}

export {
  saveBoard,
  loadBoard,
  listSaves,
  deleteSave,
  deleteAllSaves,
  changeSaveName,
  newSave,
  renameSave,
};
