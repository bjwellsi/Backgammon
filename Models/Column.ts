import Color from "./Color";
import Piece from "./Piece";
import RendersInConsole from "./RendersInConsole";
import { Type } from "class-transformer";

class Column implements RendersInConsole {
  @Type(() => Piece)
  pieces: Piece[];

  constructor() {
    this.pieces = [];
  }

  empty(): boolean {
    return this.pieces.length === 0;
  }

  canBeHit(): boolean {
    return this.pieces.length === 1;
  }

  approvedForMove(piece: Piece): boolean {
    if (this.color == piece.color || this.empty() || this.canBeHit()) {
      return true;
    } else {
      return false;
    }
  }

  get color() {
    if (this.empty()) {
      return Color.None;
    } else {
      return this.pieces[0].color;
    }
  }

  addPiece(piece: Piece): Piece | void {
    //returns the piece that was hit or nothing if add was successful
    if (this.empty() || this.color == piece.color) {
      this.pieces.push(piece);
    } else if (this.pieces.length === 1) {
      //hit
      let victim = this.pieces.pop();
      this.pieces.push(piece);
      return victim;
    } else {
      throw Error("Column can't have multiple piece colors\n");
    }
  }

  removePiece(): Piece {
    if (this.empty()) {
      throw Error("No pieces to remove\n");
    } else {
      //guaranteed to be a piece because it's not empty
      return this.pieces.pop() as Piece;
    }
  }

  retrieveFirstPiece(): Piece {
    if (this.empty()) {
      throw Error("No pieces present\n");
    } else {
      return this.pieces[0];
    }
  }

  renderInConsole(): string {
    let col = this.pieces.map((piece) => piece.renderInConsole()).join("");
    while (col.length < 7) {
      col += " ";
    }
    return col;
  }
}

export default Column;
