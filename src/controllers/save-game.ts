import { serialize, deserialize } from "class-transformer";
import Board from "../models/board";
import { getBoard } from "./board-provider";

function saveSomeBoard(board: Board, saveName: string) {
  let content = serialize(board);
  localStorage.setItem(saveName, content);
}

function saveBoard(saveName: string): void {
  saveSomeBoard(getBoard(), saveName);
}

function loadBoard(saveName: string): Board | null {
  let content = localStorage.getItem(saveName);
  let board = null;
  if (content) {
    board = deserialize(Board, content);
  }
  return board;
}

function newSave(): void {
  let board = getBoard();
  let saves = listSaves();
  let saveName;
  let i = 0;
  while (!saveName) {
    let newName = `Save${i}`;
    if (saves.indexOf(newName) < 0) {
      saveName = newName;
    }
    i++;
  }
  saveBoard(saveName);
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
    if (key) {
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
  newSave,
  renameSave,
};
