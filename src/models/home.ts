import { Piece } from "./piece";
import { Color } from "./Color";
import { PieceList } from "./piece-list";
import { ID } from "./id";

class Home extends PieceList {
  private readonly _color: Color;
  maxPieceCount: number;

  constructor(color: Color, maxPieceCount: number) {
    const idval = Color[color] + "-home";
    const id = new ID("home", idval);
    super(id);
    this._color = color;
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color, Color[color] + i));
    }
  }

  get color() {
    return this._color;
  }

  addPiece(piece: Piece): void {
    if (piece.color != this.color) {
      throw Error("Wrong home");
    }
    if (this.homeFull()) {
      throw Error("Home is full");
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
}

export { Home };
