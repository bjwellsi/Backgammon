import { promises as fs } from "fs";
import { serialize, deserialize } from "class-transformer";
import { Type } from "./node_modules/typescript/lib/typescript";

class Storage {
  constructor() {}
  async save(obj) {
    //very basic default behavior for now
    let contents = serialize(obj);
    //let contents = JSON.stringify(obj, null, 2);
    await fs.writeFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      contents,
    );
  }

  async load(type: Type) {
    //very basic default behavior for now
    let content = await fs.readFile(
      "/Users/braiden/Documents/BackgammonSaves/save.json",
      "utf-8",
    );
    return deserialize(type, content);
    //return Object.assign(JSON.parse(content));
  }
}

export default Storage;
