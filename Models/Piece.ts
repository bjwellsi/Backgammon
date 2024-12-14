//@ts-nocheck
class Piece {
  //probably wise to make color an enum so you don't have to remember formatting
  constructor(color) {
    this._color = color;
  }

  get color() {
    return this._color;
  }

  renderInConsole() {
    if (this.color == "black") {
      return "b";
    } else {
      return "w";
    }
  }
}

export default Piece;
