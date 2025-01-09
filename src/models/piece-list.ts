import { Color } from "./color";
import { Piece } from "./piece";
import { Type } from "class-transformer";

class PieceList {
  @Type(() => Piece)
  pieces: Piece[];

  readonly id: string;

  constructor(id: string) {
    this.pieces = [];
    this.id = id;
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
      throw Error("Column can't have multiple piece colors\n");
    }
  }

  removePiece(): Piece {
    if (this.empty) {
      throw Error("No pieces to remove\n");
    } else {
      //guaranteed to be a piece because it's not empty
      return this.pieces.pop() as Piece;
    }
  }

  retrieveFirstPiece(): Piece {
    if (this.empty) {
      throw Error("No pieces present\n");
    } else {
      return this.pieces[0];
    }
  }
}

export { PieceList };
