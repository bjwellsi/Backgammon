import { Piece } from "./Piece.js";

class Home {
  constructor(color, maxPieceCount) {
    this.pieces = [];
    this.color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      addPiece(new Piece(color));
    }
  }

  addPiece(piece) {
    if (piece.color == color) {
      pieces.push(piece);
    } else {
      throw Error("wrong home");
    }
  }

  removePiece() {
    return pieces.pop();
  }

  homeFull() {
    return pieces.length == maxPieceCount;
  }
}

export default Home;
