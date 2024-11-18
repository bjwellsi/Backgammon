import Piece from "./Piece.js";

class Home {
  constructor(color, maxPieceCount) {
    this.pieces = [];
    this.color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color));
    }
  }

  addPiece(piece) {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong home");
    }
  }

  removePiece() {
    return this.pieces.pop();
  }

  homeFull() {
    return this.pieces.length == this.maxPieceCount;
  }

  renderInConsole() {
    return this.pieces.map((piece) => piece.renderInConsole()).join("");
  }
}

export default Home;
