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
};
