import Readline from "readline";

class UserInput {
  constructor() {}

  async getInput(question) {
    let readLine = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      readLine.question(question, (input) => {
        resolve(input);
        readLine.close();
      });
    });
  }

  createOutput(message) {
    console.log(message);
  }
}

export default UserInput;
