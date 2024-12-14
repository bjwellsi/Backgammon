//@ts-nocheck
import Piece from "./Piece.js";
import Column from "./Column.js";

class Home extends Column {
  constructor(color, maxPieceCount) {
    super();
    this._color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color));
    }
  }

  addPiece(piece) {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong home\n");
    }
  }

  get color() {
    return this._color;
  }

  approvedForMove(piece) {
    if (piece.color == this.color) {
      return true;
    } else {
      return false;
    }
  }

  homeFull() {
    return this.pieces.length == this.maxPieceCount;
  }

  renderInConsole() {
    return this.color + " Home:" + super.renderInConsole();
  }
}

export default Home;
