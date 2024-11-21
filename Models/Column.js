import Piece from "./Piece.js";

class Column {
  constructor() {
    this.pieces = [];
  }

  empty() {
    return this.pieces.length === 0;
  }

  canBeHit() {
    return this.pieces.length === 1;
  }

  approvedForMove(piece) {
    if (this.getColor() == piece.color || this.empty() || this.canBeHit()) {
      return true;
    } else {
      return false;
    }
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
      throw Error("Column can't have multiple piece colors\n");
    }
  }

  removePiece() {
    if (this.empty()) {
      throw Error("No pieces to remove\n");
    } else {
      return this.pieces.pop();
    }
  }

  getFirstPiece() {
    if (this.empty()) {
      throw Error("No pieces present\n");
    } else {
      return this.pieces[0];
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
