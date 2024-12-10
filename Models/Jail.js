import Piece from "./Piece.js";
import Column from "./Column.js";

class Jail extends Column {
  constructor(color) {
    super();
    this._color = color;
  }

  get color() {
    return this._color;
  }

  addPiece(piece) {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong jail\n");
    }
  }

  approvedForMove(piece) {
    if (piece.color == this.color) {
      return true;
    } else {
      return false;
    }
  }
}

export default Jail;
