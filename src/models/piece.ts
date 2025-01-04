import { Color } from "./color";
import { RendersInConsole } from "./renders-in-console";

class Piece implements RendersInConsole {
  readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  renderInConsole(): string {
    if (this.color == Color.Black) {
      return "b";
    } else if (this.color == Color.White) {
      return "w";
    } else {
      return "";
    }
  }
}

export { Piece };
