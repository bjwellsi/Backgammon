import Board from "./Models/Board.js";
import ConsoleView from "./ConsoleView.js";

class GameControlFlow {
  constructor() {
    this.board = new Board();
    this.view = new ConsoleView();
  }

  async rollDice() {
    await this.view.requestDiceRoll();
    this.board.currentTeam.dice.roll();
    this.view.reloadObject(this.board.currentTeam.dice);
  }

  async runTurn() {
    while (this.board.currentTeam.dice.rollsRemain()) {
      this.view.reloadObject(this.board);
      if (!this.board.hasLegalMovesRemaining()) {
        break;
      }
      let action = await this.view.retrieveNextMove();
      if (action != null) {
        try {
          this.board.processTurnAction(action);
        } catch (error) {
          await this.view.processError(error);
        }
      }
    }

    this.board.currentTeam.dice.clearRolls();
    this.view.reloadObject(this.board.currentTeam.dice);
    await this.view.endTurn();
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

  async playGame() {
    await this.runFirstTurn();
    let winner = this.board.winner;

    while (winner === undefined) {
      await this.rollDice();
      await this.runTurn();
      winner = this.board.winner; //check if someone has won
    }

    await this.view.endGame(winner);
    await this.playGame(); //restart the game
  }
}

export default GameControlFlow;
