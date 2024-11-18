import Board from "./Models/Board.js";

class GameController {
  constructor() {
    this.board = new Board();
  }

  playGame() {
    //fake couple moves for testing manually
    /*    this.board.turn = "black";
    this.board.blackDice.rolls.push(2);
    this.board.blackDice.rolls.push(1);
    console.log(this.board.renderInConsole());
    this.board.movePiece(5, 3);
    console.log(this.board.renderInConsole());
    this.board.movePiece(5, 4);
    console.log(this.board.renderInConsole());

    this.board.turn = "white";
    this.board.whiteDice.rolls.push(3);
    this.board.whiteDice.rolls.push(4);
    console.log(this.board.renderInConsole());
    this.board.movePiece(0, 3);
    console.log(this.board.renderInConsole());
    this.board.movePiece(0, 4);
    console.log(this.board.renderInConsole());
    */

    //initialize the game
    //get a single roll from each player
    //compare the rolls, give the lower roll to the higher player, it's now their turn
    //if the rolls were equal, just restart the process
    let board = this.board;
    let blackRoll = 0;
    let whiteRoll = 0;
    do {
      //should wait for user to roll here, so it actually feels like a game
      //TODO
      blackRoll = board.blackDice.rollForIniative();
      //should wait for user to roll here, so it actually feels like a game
      //TODO
      whiteRoll = board.whiteDice.rollForIniative();
      //should print the rolls here
      //TODO
      if (whiteRoll > blackRoll) {
        board.whiteDice.addRoll(blackRoll);
        board.blackDice.clearDice();
        board.turn = "white";
        //print who won here
        //TODO
      } else if (whiteRoll < blackRoll) {
        board.blackDice.addRoll(blackRoll);
        board.whiteDice.clearDice();
        board.turn = "black";
        //print who won here
        //TODO
      }
    } while (blackRoll == whiteRoll);
    console.log(this.board.renderInConsole());

    //as long as there are rolls left, get the next move from the player that goes first
    //

    //roll the dice
    //

    //as long as there are rolls left, get the next move from the next player
    //

    //check whether the game is won
    //

    //repeat the last 3 steps
    //
  }
}

export default GameController;
