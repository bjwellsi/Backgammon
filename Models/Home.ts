import Piece from "./Piece";
import Column from "./Column";
import Color from "./Color";

class Home extends Column {
  private readonly _color: Color;
  maxPieceCount: number;

  constructor(color: Color, maxPieceCount: number) {
    super();
    this._color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color));
    }
  }

  get color() {
    return this._color;
  }

  addPiece(piece: Piece): void {
    if (piece.color != this.color) {
      throw Error("Wrong home\n");
    }
    if (this.homeFull()) {
      throw Error("Home is full\n");
    }
    this.pieces.push(piece);
  }

  approvedForMove(piece: Piece): boolean {
    if (piece.color == this.color && !this.homeFull()) {
      return true;
    } else {
      return false;
    }
  }

  homeFull(): boolean {
    return this.pieces.length >= this.maxPieceCount;
  }

  renderInConsole(): string {
    return Color[this.color] + " Home:" + super.renderInConsole();
  }
}

export default Home;
