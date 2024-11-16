import { Piece } from "./Piece.js";

class Column {
  constructor() {
    this.pieces = [];
  }

  empty() {
    if (pieces.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getColor() {
    if (empty()) {
      return "neutral";
    } else {
      return pieces[0].color;
    }
  }

  addPiece(piece) {
    //returns the piece that was hit or nothing if add was successful
    if (empty() || getColor() == piece.color) {
      pieces.push(piece);
    } else if (pieces.length === 1) {
      //hit
      let victim = pieces.pop();
      pieces.push(piece);
      return victim;
    } else {
      throw Error("column can't have multiple piece colors");
    }
  }

  removePiece() {
    if (empty()) {
      throw Error("column is empty");
    } else {
      return pieces.pop();
    }
  }
}

export default Column;
