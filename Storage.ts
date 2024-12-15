import { promises as fs } from "fs";
import { serialize, deserialize } from "class-transformer";
import Board from "./models/board";

class Storage {
  constructor() {}
  async saveBoard(board: Board): Promise<void> {
    //very basic default behavior for now
    let content = serialize(board);
    await fs.writeFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      content,
    );
  }

  async loadBoard(): Promise<Board> {
    //very basic default behavior for now
    let content = await fs.readFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      "utf-8",
    );
    let board = deserialize(Board, content);
    return board;
  }
}

export default Storage;
