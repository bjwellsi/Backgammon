import { Color } from "./color";

class Piece {
  readonly color: Color;
  readonly id: string;
  directionMultiplier: number;

  constructor(color: Color, id: string, directionMultiplier: number) {
    this.color = color;
    this.id = id;
    this.directionMultiplier = directionMultiplier;
  }
}

export { Piece };
