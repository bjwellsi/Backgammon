import { Color } from "./color";
import { ID } from "./id";
import { Piece } from "./piece";
import { PieceList } from "./piece-list";

class Column extends PieceList {
  constructor(index: number) {
    const id = new ID("column", `column-${index}`);
    super(id);
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
