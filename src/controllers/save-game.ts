//import { promises as fs } from "fs";
import { serialize, deserialize } from "class-transformer";
import Board from "../models/board";

class SaveGame {
  constructor() {}
  async saveBoard(board: Board, fileName: string): Promise<void> {
    //very basic default behavior for now
    let content = serialize(board);
    return await new Promise<void>();
    // fs.writeFile(
    //  `/Users/braiden/Documents/BackgammonSaves/${fileName}.json`,
    // content,
    // );
  }

  async loadBoard(fileName: string): Promise<Board> {
    //very basic default behavior for now
    let content = await fs.readFile(
      `/Users/braiden/Documents/BackgammonSaves/${fileName}.json`,
      "utf-8",
    );
    let board = deserialize(Board, content);
    return board;
  }
}

export default SaveGame;
