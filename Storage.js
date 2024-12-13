import { promises as fs } from "fs";

class Storage {
  constructor() {}
  async save(obj) {
    //very basic default behavior for now
    await fs.writeFile("save.json", JSON.stringify(obj, null, 2));
  }

  async load() {
    //very basic default behavior for now
    return await JSON.parse(fs.readFile("save.json", "utf-8"));
  }
}

export default Storage;
