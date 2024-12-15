import Piece from "./Piece";
import Column from "./Column";
import Color from "./Color";
import { Type } from "class-transformer";

class Jail extends Column {
  private readonly _color: Color;

  constructor(color: Color) {
    super();
    this._color = color;
  }

  get color() {
    return this._color;
  }

  addPiece(piece: Piece): void {
    if (piece.color == this.color) {
      this.pieces.push(piece);
    } else {
      throw Error("wrong jail\n");
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

export default Jail;
