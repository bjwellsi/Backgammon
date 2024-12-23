import { promises as fs } from "fs";
import { serialize, deserialize } from "class-transformer";
import Board from "../models/board";

class SaveGame {
  constructor() {}
  saveBoard(board: Board, fileName: string): void {
    //very basic default behavior for now
    let content = serialize(board);
    localStorage.setItem(fileName, content);
  }

  loadBoard(fileName: string): Board | null {
    //very basic default behavior for now
    let content = localStorage.getItem(fileName);
    let board = null;
    if (content) {
      board = deserialize(Board, content);
    }
    return board;
  }

  listSaves(): string[] {
    let saves = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        saves.push(key);
      }
    }
    return saves;
  }
}

export default SaveGame;
