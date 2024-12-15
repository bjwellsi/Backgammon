import Color from "./Color";
import RendersInConsole from "./RendersInConsole";

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

export default Piece;
