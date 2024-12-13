import Board from "./Models/Board.js";
import ConsoleView from "./ConsoleView.js";
import Storage from "./Storage.js";

class GameControlFlow {
  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
    this.storage = new Storage();
  }

  /*
  async runFirstTurn() {
    //initialize the game
    //get a single roll from each team
    //compare the rolls, give the lower roll to the higher team, it's now their turn
    //if the rolls were equal, just restart the process
    let blackRoll = 0;
    let whiteRoll = 0;
    do {
      this.board.setStartingTurn("black", "white");
      this.view.reloadObject(this.board);
      await this.view.requestDiceRoll();
      blackRoll = this.board.currentTeam.dice.rollForIniative();
      this.view.reloadObject(this.board.currentTeam.dice);
      await this.view.endTurn();
      this.board.changeTurn();
      this.view.reloadObject(this.board);
      await this.view.requestDiceRoll();
      whiteRoll = this.board.currentTeam.dice.rollForIniative();
      this.view.reloadObject(this.board.currentTeam.dice);
      await this.view.endTurn();
      if (whiteRoll > blackRoll) {
        this.board.currentTeam.dice.addRoll(blackRoll);
        this.board.currentOpponent.dice.clearRolls();
      } else if (whiteRoll < blackRoll) {
        this.board.changeTurn();
        this.board.currentTeam.dice.addRoll(whiteRoll);
        this.board.currentOpponent.dice.clearRolls();
      } else {
        //rolls were equal. Restart the process
        this.board.changeTurn();
        this.board.currentTeam.dice.clearRolls();
        this.board.currentOpponent.dice.clearRolls();
        //this part isn't necessary but feels cleaner
        blackRoll = 0;
        whiteRoll = 0;
      }
    } while (blackRoll == whiteRoll);
    await this.runTurn(); //gotta do the first turn before starting the loop so you can check win status at the beginning of the loop
  }
  */

  async performUserAction(command) {
    if (command === "game") {
      //just going to return the command to the outer loop for now, let it handle ending the loop
      //putting it in here so that none of the command processing happens outside this method
      //right now there's no processing to really do on this command though
      return command;
    } else if (command === "roll") {
      //will throw an error if you've already rolled this turn
      this.board.rollDice();
    } else if (command === "turn") {
      //should end the turn. for now we'll just end it no matter what, instead of checking whether there are moves left
      this.board.clearDice("team");
      this.board.changeTurn();
    } else if (command === "save") {
      //save the game
      await this.storage.save(this.board);
    } else if (command === "load") {
      //load the save game, for now only one save allowed
      this.board = await this.storage.load();
    } else {
      //assume that we've gotten a move back
      this.board.processTurnAction(command);
    }
  }

  async playGame() {
    //have to process first turn in here somewhere
    //
    //
    //
    //todo
    //
    //
    //
    //
    //
    let winner = this.board.winner;
    while (winner === undefined) {
      this.view.reloadObject(this.board);
      try {
        let command = await this.view.processInput();
        if (command != "nothing") {
          if ((await this.performUserAction(command)) == "game") {
            winner = "nobody";
          }
        }
      } catch (error) {
        this.view.processError(error);
      }
    }

    this.view.declareWinner(winner);
  }
}

export default GameControlFlow;
