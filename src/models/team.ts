import { Jail } from "./jail";
import { Home } from "./home";
import { Dice } from "./dice";
import { Color } from "./color";
import { Type } from "class-transformer";

class Team {
  color: Color;
  homeBaseSize: number;

  @Type(() => Home)
  home: Home;
  @Type(() => Jail)
  jail: Jail;
  @Type(() => Dice)
  dice: Dice;

  constructor(
    color: Color,
    piecesPerTeam: number,
    directionMultiplier: number,
    homeBaseSize: number,
    homeIndex: number,
    jailIndex: number,
  ) {
    this.color = color;
    this.home = new Home(color, piecesPerTeam, homeIndex, directionMultiplier);
    this.jail = new Jail(color, jailIndex);
    this.dice = new Dice();
    this.homeBaseSize = homeBaseSize;
  }

  hasWon(): boolean {
    return this.home.homeFull();
  }
}

export { Team };
