import Jail from "./Jail";
import Home from "./Home";
import Dice from "./Dice";
import Color from "./Color";

class Team {
  color: Color;
  private _piecesPerTeam: number;
  directionMultiplier: number;
  private _homeBaseStart: number;
  private _homeBaseSize: number;
  home: Home;
  jail: Jail;
  dice: Dice;

  constructor(
    color: Color,
    piecesPerTeam: number,
    directionMultiplier: number,
    homeBaseStart: number,
    homeBaseSize: number,
  ) {
    this.color = color;
    this._piecesPerTeam = piecesPerTeam;
    this.home = new Home(color, piecesPerTeam);
    this.jail = new Jail(color);
    this.dice = new Dice();
    this.directionMultiplier = directionMultiplier;
    this._homeBaseStart = homeBaseStart;
    this._homeBaseSize = homeBaseSize;
  }

  homeBaseIndex(columnIndex: number): number {
    //returns -1 if the index is out of bounds of the home base
    let index = Math.abs(this._homeBaseStart - columnIndex);
    if (index < this._homeBaseSize) {
      return index;
    } else {
      return -1;
    }
  }

  homeBaseIndexToColumnNum(homeBaseIndex: number): number {
    if (homeBaseIndex >= this._homeBaseSize) {
      return -1;
    } else {
      return this._homeBaseStart - homeBaseIndex * this.directionMultiplier;
    }
  }

  isInHomeBase(columnIndex: number): boolean {
    const index = this.homeBaseIndex(columnIndex);
    return index >= this.minHomeBaseIndex() && index <= this.maxHomeBaseIndex();
  }

  minHomeBaseIndex(): number {
    return 0;
  }

  maxHomeBaseIndex(): number {
    return this._homeBaseSize - 1;
  }

  incrementHomeBaseIndex(homeBaseIndex: number): number {
    homeBaseIndex++;
    if (this._homeBaseSize <= homeBaseIndex) {
      return -1;
    }
    return homeBaseIndex;
  }

  decrementHomeBaseIndex(homeBaseIndex: number): number {
    homeBaseIndex--;
    if (homeBaseIndex < 0) {
      return -1;
    }
    return homeBaseIndex;
  }

  hasWon(): boolean {
    return this.home.homeFull();
  }
}

export default Team;
