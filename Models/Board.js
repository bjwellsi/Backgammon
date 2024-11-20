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
    this.whitePlayer.jail.addPiece(this.columns[0].removePiece());
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

  jailBreak(columnNum, player) {
    let toCol = this.columns[columnNum];

    let dice = this.whitePlayer.dice;
    let selfJail = this.whitePlayer.jail;
    let otherJail = this.blackPlayer.jail;
    let selfHome = this.whitePlayer.home;

    if (this.turn == "black") {
      dice = this.blackPlayer.dice;
      selfJail = this.blackPlayer.jail;
      otherJail = this.whitePlayer.jail;
      selfHome = this.blackPlayer.home;
    }

    //first get the base nums for the enemy player
    let enemyStartColumn = 23;
    if ((player.color = "white")) {
      enemyStartColumn = 0;
    }

    let inmate = selfJail.pieces[0];

    //check if there's a space at the given column
    //if so, remove the piece from jail and put it in the column
    if (!this.spaceAvailable(columnNum, inmate)) {
      throw Error("Can't move to a column full of the other team");
    } else {
      if (!toCol.empty() && toCol.getColor() != inmate.color) {
        //hit
        otherJail.addPiece(toCol.removePiece());
      }
      //move
      //this is where you could log the move if you wanted an undo feature
      toCol.addPiece(selfJail.removePiece());
      dice.useRoll(Math.abs(columnNum - enemyStartColumn) + 1);
    }
  }

  goHome(columnNum, player) {
    //basically just check if the player has any pieces outside their base
    //if they don't and there's a piece at that col, move the piece home
    let dice = this.whitePlayer.dice;
    let selfJail = this.whitePlayer.jail;
    let selfHome = this.whitePlayer.home;

    if (this.turn == "black") {
      dice = this.blackPlayer.dice;
      selfHome = this.blackPlayer.home;
      otherJail = this.whitePlayer.jail;
    }
    //first get the base nums for the given player
    let baseStartColumn = 0;
    if ((player.color = "white")) {
      baseStartColumn = 23;
    }
    if (Math.abs(columnNum - baseStartColumn) > 6) {
      throw new Error("Can only move home from your first six columns");
    } else {
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

      const distance = Math.abs(columnNum - baseStartColumn);
      //make sure the distance is available
      if (!dice.rollLegal(distance)) {
        putPieceBack("Can't move that distance with current roll");
      }
      dice.useRoll(distance);
      selfHome.addPiece(piece);
    }
  }

  spaceAvailable(columnNum, piece) {
    //is the column currently full of the other team?
    let col = this.columns[columnNum];
    if (!col.empty() && col.getColor() != piece.color) {
      //can we hit?
      if (!col.canHit()) {
        //no we can't
        return false;
      }
    }
    return true;
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

    if (!this.spaceAvailable(to, piece)) {
      putPieceBack("Can't move to a column full of the other team");
    } else {
      if (!toCol.empty() && toCol.getColor() != piece.color) {
        //hit
        otherJail.addPiece(toCol.removePiece());
      }
      //move
      //this is where you could log the move if you wanted an undo feature
      toCol.addPiece(piece);
      dice.useRoll(distance);
    }
  }
}

export default Board;
