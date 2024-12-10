import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";
import ConsoleView from "./ConsoleView.js";

class GameControlFlow {
  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
  }

  async rollDice() {
    await this.view.requestDiceRoll();
    this.view.reloadObject(this.board.currentTeam().dice);
  }

  async runTurn() {
    while (this.board.currentTeam().dice.rollsRemain()) {
      if (!this.board.hasLegalMovesRemaining()) {
        break;
      }
      let action = await this.view.getNextMove();
      try {
        this.board.processTurnAction(action);
      } catch (error) {
        await this.view.processError(error);
      }
      this.view.reloadObject(this.board);
    }

    this.board.currentTeam().dice.clearRolls();
    this.board.changeTurn();
  }

  async runFirstTurn() {
    //initialize the game
    //get a single roll from each team
    //compare the rolls, give the lower roll to the higher team, it's now their turn
    //if the rolls were equal, just restart the process
    let blackRoll = 0;
    let whiteRoll = 0;
    do {
      this.board.setStartingTurn("black", "white");
      await this.view.requestDiceRoll();
      blackRoll = this.board.currentTeam().dice.rollForIniative();
      this.view.reloadObject(this.board);
      this.board.changeTurn();
      whiteRoll = this.board.currentTeam().dice.rollForIniative();
      this.view.reloadObject(this.board);
      if (whiteRoll > blackRoll) {
        board.currentTeam().dice.addRoll(blackRoll);
        board.currentOpponent().dice.clearRolls();
      } else if (whiteRoll < blackRoll) {
        board.changeTurn();
        board.currentTeam().dice.addRoll(whiteRoll);
        board.currentOpponent().dice.clearRolls();
      } else {
        //rolls were equal. Restart the process
        board.changeTurn();
        board.currentTeam().dice.clearRolls();
        board.currentOpponent().dice.clearRolls();
        //this part isn't necessary but feels cleaner
        blackRoll = 0;
        whiteRoll = 0;
      }
    } while (blackRoll == whiteRoll);
    await this.runTurn(); //gotta do the first turn before starting the loop so you can check win status at the beginning of the loop
  }

  async playGame() {
    await this.runFirstTurn();
    let winner = this.board.winner();

    while (winner === undefined) {
      await this.rollDice();
      await this.runTurn();
      winner = this.board.winner(); //check if someone has won
    }

    await this.view.endGame(winner);
    await this.playGame(); //restart the game
  }
}

export default GameControlFlow;
