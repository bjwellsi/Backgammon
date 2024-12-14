//@ts-nocheck
import { promises as fs } from "fs";
import Board from "./Models/Board.js";

class Storage {
  constructor() {}
  async save(obj) {
    //very basic default behavior for now
    let contents = JSON.stringify(obj, null, 2);
    await fs.writeFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      contents,
    );
  }

  async load() {
    //very basic default behavior for now
    let content = await fs.readFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      "utf-8",
    );
    return Object.assign(JSON.parse(content));
  }
}

export default Storage;
