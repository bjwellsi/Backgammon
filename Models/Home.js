import Piece from "./Piece.js";
import Column from "./Column.js";

class Home extends Column {
  constructor(color, maxPieceCount) {
    super();
    this.color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color));
    }
  }

  addPiece(piece) {
    if (piece.color == this.getColor()) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong home\n");
    }
  }

  getColor() {
    return this.color;
  }

  approvedForMove(piece) {
    if (piece.color == this.getColor()) {
      return true;
    } else {
      return false;
    }
  }

  homeFull() {
    return this.pieces.length == this.maxPieceCount;
  }
}

export default Home;
