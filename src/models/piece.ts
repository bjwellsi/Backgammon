import { Color } from "./color";

class Piece {
  readonly color: Color;
  readonly id: string;

  constructor(color: Color, id: string) {
    this.color = color;
    this.id = id;
  }
}

export { Piece };
