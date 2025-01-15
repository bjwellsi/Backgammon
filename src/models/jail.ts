import { Piece } from "./Piece";
import { Color } from "./Color";
import { PieceList } from "./piece-list";
import { ID } from "./id";

class Jail extends PieceList {
  constructor(color: Color, legalColors: Color[], locationIndex: number) {
    const idval = Color[color] + "-jail";
    const id = new ID("jail", idval);
    super(id, locationIndex, legalColors);
  }
}

export { Jail };
