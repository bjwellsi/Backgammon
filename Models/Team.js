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
    //returns -1 if the index is out of bounds of the home base
    let index = Math.abs(this.homeBaseStart - columnIndex);
    if (index < this.homeBaseSize) {
      return index;
    } else {
      return -1;
    }
  }

  homeBaseIndexToColumnNum(homeBaseIndex) {
    if (homeBaseIndex >= this.homeBaseSize) {
      return -1;
    } else {
      return this.homeBaseStart - homeBaseIndex * this.directionMultiplier;
    }
  }

  isInHomeBase(columnIndex) {
    const index = this.homeBaseIndex(columnIndex);
    return index >= this.minHomeBaseIndex() && index <= this.maxHomeBaseIndex();
  }

  minHomeBaseIndex() {
    return 0;
  }

  maxHomeBaseIndex() {
    return this.homeBaseSize - 1;
  }

  incrementHomeBaseIndex(homeBaseIndex) {
    homeBaseIndex++;
    if (this.homeBaseSize <= homeBaseIndex) {
      return -1;
    }
    return homeBaseIndex;
  }

  decrementHomeBaseIndex(homeBaseIndex) {
    homeBaseIndex--;
    if (homeBaseIndex < 0) {
      return -1;
    }
    return homeBaseIndex;
  }

  hasWon() {
    return this.home.homeFull();
  }
}

export default Team;
