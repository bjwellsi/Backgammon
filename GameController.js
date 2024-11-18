import Board from "./Models/Board.js";

class GameController {
  constructor() {
    this.board = new Board();
  }

  playGame() {
    console.log(this.board);
    this.board.turn = "black";
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
    this.board.movePiece(0, 3);
    console.log(this.board.renderInConsole());
    this.board.movePiece(0, 4);
    console.log(this.board.renderInConsole());
  }
}

export default GameController;
