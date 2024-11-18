import Readline from "readline";

class UserInput {
  constructor() {
    this.readLine = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getInput(question) {
    let userResponse;
    this.readLine.question(question, (input) => {
      userResponse = input;
      this.readLine.close();
    });
    return userResponse;
  }
}

export default UserInput;
