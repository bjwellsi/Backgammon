import Jail from "./Jail.js";
import Column from "./Column.js";
import Piece from "./Piece.js";
import Home from "./Home.js";
import Dice from "./Dice.js";

class Team {
  constructor(
    color,
    piecesPerTeam,
    directionMultiplier,
    homeBaseStart,
    homeBaseSize,
  ) {
    this.color = color;
    this.home = new Home(color, piecesPerTeam);
    this.jail = new Jail(color);
    this.dice = new Dice();
    this.directionMultiplier = directionMultiplier;
    this.homeBaseStart = homeBaseStart;
    this.homeBaseSize = homeBaseSize;
  }

  isInStartBase(columnIndex) {
    return directionMultiplier * (homeBaseStart - columnIndex) < homeBaseSize;
  }
}

export default Team;
