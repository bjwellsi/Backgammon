import Readline from "readline";

class UserInput {
  constructor() {}

  async getInput(question, priorityLevel) {
    //todo use priority level
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

  createOutput(message, priorityLevel) {
    //todo use priority level
    console.log(message);
  }
}

export default UserInput;
