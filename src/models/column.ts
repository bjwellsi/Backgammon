import { Color } from "./color";
import { Piece } from "./piece";
import { PieceList } from "./piece-list";

class Column extends PieceList {
  constructor(id: string) {
    super(id);
  }

  canBeHit(): boolean {
    return this.pieces.length === 1;
  }

  approvedForMove(piece: Piece): boolean {
    if (this.color == piece.color || this.empty || this.canBeHit()) {
      return true;
    } else {
      return false;
    }
  }

  get color() {
    if (this.empty) {
      return Color.None;
    } else {
      return this.pieces[0].color;
    }
  }
}

export { Column };
