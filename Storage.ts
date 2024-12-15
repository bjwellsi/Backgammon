import { promises as fs } from "fs";
import { serialize, deserialize } from "class-transformer";
import Board from "./Models/Board";

class Storage {
  constructor() {}
  async saveBoard(board: Board): Promise<void> {
    //very basic default behavior for now
    let contents = serialize(board);
    await fs.writeFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      contents,
    );
  }

  async loadBoard(): Promise<Board> {
    //very basic default behavior for now
    let content = await fs.readFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      "utf-8",
    );
    return deserialize(Board, content);
  }
}

export default Storage;
