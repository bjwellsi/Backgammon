import { Piece } from "./piece";
import { Color } from "./Color";
import { PieceList } from "./piece-list";
import { ID } from "./id";

class Home extends PieceList {
  maxPieceCount: number;

  constructor(
    color: Color,
    legalColors: Color[],
    maxPieceCount: number,
    locationIndex: number,
    directionMultiplier: number,
  ) {
    const idval = Color[color] + "-home";
    const id = new ID("home", idval);
    super(id, locationIndex, legalColors);
    this.maxPieceCount = maxPieceCount;

    for (let i = 0; i < maxPieceCount; i++) {
      this.addPiece(new Piece(color, Color[color] + i, directionMultiplier));
    }
  }

  homeFull(): boolean {
    return this.pieces.length >= this.maxPieceCount;
  }
}

export { Home };
