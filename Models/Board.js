import Column from "./Column.js";
import Jail from "./Jail.js";
import Home from "./Home.js";
import Dice from "./Dice.js";
import Player from "./Player.js";

class Board {
  constructor() {
    this.piecesPerTeam = 15;

    this.blackPlayer = new Player("black", this.piecesPerTeam);
    this.whitePlayer = new Player("white", this.piecesPerTeam);

    this.turn = null;

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
  }

  populateColumns() {
    //just braking this out for readability and potentially extensibility
    this.columns[0].addPiece(this.whitePlayer.home.removePiece());
    this.columns[0].addPiece(this.whitePlayer.home.removePiece());

    this.columns[11].addPiece(this.whitePlayer.home.removePiece());
    this.columns[11].addPiece(this.whitePlayer.home.removePiece());
    this.columns[11].addPiece(this.whitePlayer.home.removePiece());
    this.columns[11].addPiece(this.whitePlayer.home.removePiece());
    this.columns[11].addPiece(this.whitePlayer.home.removePiece());

    this.columns[16].addPiece(this.whitePlayer.home.removePiece());
    this.columns[16].addPiece(this.whitePlayer.home.removePiece());
    this.columns[16].addPiece(this.whitePlayer.home.removePiece());

    this.columns[18].addPiece(this.whitePlayer.home.removePiece());
    this.columns[18].addPiece(this.whitePlayer.home.removePiece());
    this.columns[18].addPiece(this.whitePlayer.home.removePiece());
    this.columns[18].addPiece(this.whitePlayer.home.removePiece());
    this.columns[18].addPiece(this.whitePlayer.home.removePiece());

    this.columns[23].addPiece(this.blackPlayer.home.removePiece());
    this.columns[23].addPiece(this.blackPlayer.home.removePiece());

    this.columns[12].addPiece(this.blackPlayer.home.removePiece());
    this.columns[12].addPiece(this.blackPlayer.home.removePiece());
    this.columns[12].addPiece(this.blackPlayer.home.removePiece());
    this.columns[12].addPiece(this.blackPlayer.home.removePiece());
    this.columns[12].addPiece(this.blackPlayer.home.removePiece());

    this.columns[7].addPiece(this.blackPlayer.home.removePiece());
    this.columns[7].addPiece(this.blackPlayer.home.removePiece());
    this.columns[7].addPiece(this.blackPlayer.home.removePiece());

    this.columns[5].addPiece(this.blackPlayer.home.removePiece());
    this.columns[5].addPiece(this.blackPlayer.home.removePiece());
    this.columns[5].addPiece(this.blackPlayer.home.removePiece());
    this.columns[5].addPiece(this.blackPlayer.home.removePiece());
    this.columns[5].addPiece(this.blackPlayer.home.removePiece());
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
                                                                       ${this.turn}'s turn

    ${this.blackPlayer.home.renderInConsole()} 

    ${topRow}

                                                                       ${this.blackPlayer.jail.renderInConsole()}
    -------------------------------------------------------------------JAIL----------------------------------------------------------------------------
                                                                       ${this.whitePlayer.jail.renderInConsole()}

    ${bottomRow}

    ${this.whitePlayer.home.renderInConsole()} 
    `;

    return board;
  }

  changeTurn(color) {
    if (color != "black" && color != "white") {
      throw Error("invalid initial turn color");
    }
    this.turn = color;
  }

  changeTurn() {
    if (this.turn == "black") {
      this.turn = "white";
    } else if (this.turn == "white") {
      this.turn = "black";
    } else {
      throw Error("invalid initial turn color");
    }
  }

  jailBreak() {
    throw Error("not implemented");
  }

  goHome() {
    throw Error("not implemented");
  }

  movePiece(from, to) {
    let fromCol = this.columns[from];
    let toCol = this.columns[to];

    let dice = this.whitePlayer.dice;
    let selfJail = this.whitePlayer.jail;
    let otherJail = this.blackPlayer.jail;

    if (this.turn == "black") {
      dice = this.blackPlayer.dice;
      selfJail = this.blackPlayer.jail;
      otherJail = this.whitePlayer.jail;
    }

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

    //can't move with a piece in jail
    if (!selfJail.empty()) {
      putPieceBack("Can't move with a piece in jail");
    }

    //make sure it's moving the right way
    if (
      (piece.color == "black" && from < to) ||
      (piece.color == "white" && from > to)
    ) {
      putPieceBack("You can't move backward");
    }

    const distance = Math.abs(from - to);
    //make sure the distance is available
    if (!dice.rollLegal(distance)) {
      putPieceBack("Can't move that distance with current roll");
    }

    //is the column currently full of the other team?
    if (!toCol.empty() && toCol.getColor() != piece.color) {
      //can we hit?
      if (toCol.canHit()) {
        //yes we can, hit
        otherJail.addPiece(toCol.removePiece());
      } else {
        //no we can't
        putPieceBack("Can't move to a column full of the other team");
      }
    }

    //move the piece
    //this is where you could log the move if you wanted an undo feature
    toCol.addPiece(piece);
    dice.useRoll(distance);
  }
}

export default Board;
