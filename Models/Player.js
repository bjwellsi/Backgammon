import Jail from "./Jail.js";
import Column from "./Column.js";
import Piece from "./Piece.js";
import Home from "./Home.js";
import Dice from "./Dice.js";

class Player {
  constructor(color, piecesPerTeam) {
    this.color = color;
    this.home = new Home(color, piecesPerTeam);
    this.jail = new Jail(color);
    this.dice = new Dice();
  }
}

export default Player;
