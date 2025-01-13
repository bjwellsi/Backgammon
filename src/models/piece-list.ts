import { Color } from "./color";
import { ID } from "./id";
import { Piece } from "./piece";
import { Type } from "class-transformer";

class PieceList {
  @Type(() => Piece)
  pieces: Piece[];

  readonly id: ID;
  locationIndex: number;

  constructor(id: ID, locationIndex: number) {
    this.pieces = [];
    this.id = id;
    this.locationIndex = locationIndex;
  }

  get empty(): boolean {
    return this.pieces.length === 0;
  }

  get color(): Color {
    return Color.None;
  }

  addPiece(piece: Piece): Piece | void {
    //returns the piece that was hit or nothing if add was successful
    if (this.empty || this.color == piece.color) {
      this.pieces.push(piece);
    } else if (this.pieces.length === 1) {
      //hit
      const victim = this.pieces.pop();
      this.pieces.push(piece);
      return victim;
    } else {
      throw Error("Column can't have multiple piece colors");
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
