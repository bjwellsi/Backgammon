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
}

export default Jail;
