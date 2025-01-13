import { Color } from "./color";
import { ID } from "./id";
import { Piece } from "./piece";
import { Type } from "class-transformer";

class PieceList {
  @Type(() => Piece)
  pieces: Piece[];
  legalColors: Color[];

  readonly id: ID;
  locationIndex: number;

  constructor(id: ID, locationIndex: number, legalColors: Color[]) {
    this.pieces = [];
    this.id = id;
    this.locationIndex = locationIndex;
    this.legalColors = legalColors;
  }

  get empty(): boolean {
    return this.pieces.length === 0;
  }

  addPiece(piece: Piece): Piece | void {
    if (this.legalColors.indexOf(piece.color) < 0) {
      throw Error("Illegal piece");
    } else {
      this.pieces.push(piece);
    }
  }

  removePiece(): Piece {
    if (this.empty) {
      throw Error("No pieces to remove");
    } else {
      //guaranteed to be a piece because it's not empty
      return this.pieces.pop() as Piece;
    }
  }

  retrieveFirstPiece(): Piece {
    if (this.empty) {
      throw Error("No pieces present");
    } else {
      return this.pieces[0];
    }
  }
}

export { PieceList };
