class Piece {
  //probably wise to make color an enum so you don't have to remember formatting
  constructor(color) {
    this.color = color;
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
