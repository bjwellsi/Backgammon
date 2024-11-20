import Piece from "./Piece.js";

class Jail {
  constructor(color) {
    this.pieces = [];
    this.color = color;
  }

  addPiece(piece) {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong jail");
    }
  }

  removePiece() {
    return this.pieces.pop();
  }

  empty() {
    return !this.pieces.length > 0;
  }

  getFirstPiece() {
    if (this.empty()) {
      throw Error("jail is empty");
    } else {
      return this.pieces[];
    }
  }
  
  renderInConsole() {
    return this.pieces.map((piece) => piece.renderInConsole()).join("");
  }
}

export default Jail;
