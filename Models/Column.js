import Piece from "./Piece.js";

class Column {
  constructor() {
    this.pieces = [];
  }

  empty() {
    return this.pieces.length === 0;
  }

  canHit() {
    return this.pieces.length === 1;
  }

  getColor() {
    if (this.empty()) {
      return "neutral";
    } else {
      return this.pieces[0].color;
    }
  }

  addPiece(piece) {
    //returns the piece that was hit or nothing if add was successful
    if (this.empty() || this.getColor() == piece.color) {
      this.pieces.push(piece);
    } else if (this.pieces.length === 1) {
      //hit
      let victim = this.pieces.pop();
      this.pieces.push(piece);
      return victim;
    } else {
      throw Error("column can't have multiple piece colors");
    }
  }

  removePiece() {
    if (this.empty()) {
      throw Error("column is empty");
    } else {
      return this.pieces.pop();
    }
  }

  renderInConsole() {
    let col = this.pieces.map((piece) => piece.renderInConsole()).join("");
    while (col.length < 7) {
      col += " ";
    }
    return col;
  }
}

export default Column;
