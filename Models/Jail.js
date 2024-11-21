import Piece from "./Piece.js";
import Column from "./Column.js";

class Jail extends Column {
  constructor(color) {
    super();
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  addPiece(piece) {
    if (piece.color == this.getColor()) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong jail\n");
    }
  }

  approvedForMove(piece) {
    if (piece.color == this.getColor()) {
      return true;
    } else {
      return false;
    }
  }
}

export default Jail;
