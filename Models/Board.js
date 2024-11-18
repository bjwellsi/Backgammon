import Jail from "./Jail.js";
import Column from "./Column.js";
import Piece from "./Piece.js";
import Home from "./Home.js";
import Dice from "./Dice.js";

class Board {
  constructor() {
    this.piecesPerTeam = 15;

    this.blackHome = new Home("black", this.piecesPerTeam);
    this.whiteHome = new Home("white", this.piecesPerTeam);

    this.blackJail = new Jail("black");
    this.whiteJail = new Jail("white");

    this.blackDice = new Dice();
    this.whiteDice = new Dice();

    this.turn = "";

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
  }

  populateColumns() {
    //just braking this out for readability and potentially extensibility
    this.columns[0].addPiece(this.whiteHome.removePiece());
    this.columns[0].addPiece(this.whiteHome.removePiece());

    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());

    this.columns[16].addPiece(this.whiteHome.removePiece());
    this.columns[16].addPiece(this.whiteHome.removePiece());
    this.columns[16].addPiece(this.whiteHome.removePiece());

    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());

    this.columns[23].addPiece(this.blackHome.removePiece());
    this.columns[23].addPiece(this.blackHome.removePiece());

    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());

    this.columns[7].addPiece(this.blackHome.removePiece());
    this.columns[7].addPiece(this.blackHome.removePiece());
    this.columns[7].addPiece(this.blackHome.removePiece());

    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
  }

  renderInConsole() {
    let topRow = "";
    for (let i = 0; i < 12; i++) {
      topRow += `${i < 9 ? "0" : ""}${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let bottomRow = "";
    for (let i = 23; i > 11; i--) {
      bottomRow += `${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let board = `
    ${this.blackHome.renderInConsole()} 

    ${topRow}

                                                                       ${this.blackJail.renderInConsole()}
    -------------------------------------------------------------------JAIL----------------------------------------------------------------------------
                                                                       ${this.whiteJail.renderInConsole()}

    ${bottomRow}

    ${this.whiteHome.renderInConsole()} 
    `;

    return board;
  }

  movePiece(from, to) {
    let fromCol = this.columns[from];
    let toCol = this.columns[to];

    const putPieceBack = (error) => {
      fromCol.addPiece(piece);
      throw Error(error);
    };

    //make sure there's a piece there
    if (this.columns[from].length === 0) {
      throw Error("can't move piece from empty column");
    }

    //make sure the piece is the right color
    let piece = this.columns[from].removePiece();
    if (piece.color != this.turn) {
      putPieceBack("Can't move the other team's piece");
    }

    //now we at least know you have a legal piece, make sure it's moving the right way
    if (
      (piece.color == "black" && from < to) ||
      (piece.color == "white" && from > to)
    ) {
      putPieceBack("You can't move backward");
    }

    let dice = this.whiteDice;
    let jail = this.blackJail;

    if (this.turn == "black") {
      dice = this.blackDice;
      jail = this.blackJail;
    }

    const distance = Math.abs(from - to);
    //make sure the distance is available
    if (!dice.rollLegal(distance)) {
      putPieceBack("Can't move that distance with current roll");
    }

    //is the column currently full of the other team
    if (!toCol.empty() && toCol.getColor() != piece.color) {
      //can we hit
      if (toCol.canHit()) {
        //yes we can, hit
        jail.addPiece(toCol.removePiece());
      } else {
        //no we can't
        putPieceBack("Can't move to a column full of the other team");
      }
    }

    //move the piece
    //this is where you could log the move if you wanted an undo feature
    toCol.addPiece(piece);
  }
}

export default Board;
