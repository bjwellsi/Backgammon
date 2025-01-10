import { Piece } from "./Piece";
import { Color } from "./Color";
import { PieceList } from "./piece-list";
import { ID } from "./id";

class Jail extends PieceList {
  private readonly _color: Color;

  constructor(color: Color) {
    const idval = Color[color] + "-jail";
    const id = new ID("jail", idval);
    super(id);
    this._color = color;
  }

  get color() {
    return this._color;
  }

  addPiece(piece: Piece): void {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong jail");
    }
  }

  approvedForMove(piece: Piece): boolean {
    if (piece.color == this.color) {
      return true;
    } else {
      return false;
    }
  }
}

export { Jail };
