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

  homeBaseIndex(columnIndex) {
    //returns 0 if the index is out of bounds of the home base
    let index = (this.homeBaseStart - columnIndex) * this.directionMultiplier;
    if (index < this.homeBaseSize) {
      return index;
    } else {
      return -1;
    }
  }

  homeBaseIndexToColumnNum(homeBaseIndex) {
    if (homeBaseIndex >= this.homeBaseSize) {
      return 0;
    } else {
      return homeBaseIndex * this.directionMultiplier;
    }
  }

  isInHomeBase(columnIndex) {
    return this.homeBaseIndex(columnIndex) > 0;
  }

  hasWon() {
    return this.home.homeFull();
  }
}

export default Team;
