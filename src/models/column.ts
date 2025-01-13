import { Color } from "./color";
import { ID } from "./id";
import { Piece } from "./piece";
import { PieceList } from "./piece-list";

class Column extends PieceList {
  constructor(index: number, legalColors: Color[]) {
    const id = new ID("column", `column-${index}`);
    super(id, index, legalColors);
  }
}

export { Column };
