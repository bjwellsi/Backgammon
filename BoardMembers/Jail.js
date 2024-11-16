import { Piece } from "./Piece.js";

class Jail {
  constructor(color) {
    this.pieces = [];
    this.color = color;
  }

  addPiece(piece) {
    if (piece.color == color) {
      pieces.push(piece);
    } else {
      throw Error("wrong jail");
    }
  }

  removePiece() {
    return pieces.pop();
  }
}

export default Jail;
