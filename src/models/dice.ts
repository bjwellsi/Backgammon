import Chance from "chance";
import { RendersInConsole } from "./renders-in-console";
import { Exclude } from "class-transformer";

class Dice implements RendersInConsole {
  rolls: number[];
  @Exclude()
  private _chance: Chance;

  constructor() {
    this.rolls = [];
    this._chance = new Chance();
  }

  rollForIniative(): number {
    this.clearRolls();
    let die = this._chance.integer({ min: 1, max: 6 });
    this.rolls.push(die);
    return die;
  }

  roll(): number[] {
    let die1 = this._chance.integer({ min: 1, max: 6 });
    let die2 = this._chance.integer({ min: 1, max: 6 });

    this.rolls.push(die1);
    this.rolls.push(die2);

    if (die1 == die2) {
      this.rolls.push(die1);
      this.rolls.push(die2);
    }

    return this.rolls.slice(0, 2);
  }

  clearRolls(): void {
    this.rolls = [];
  }

  addRoll(roll: number): void {
    this.rolls.push(roll);
  }

  maxRoll(): number {
    return this.rolls.length > 0 ? this.rolls.sort((a, b) => a - b)[0] : 0;
  }

  useRoll(roll: number): void {
    if (!this.rollLegal(roll)) {
      throw Error("roll not available");
    }

    this.rolls.splice(this.rolls.indexOf(roll), 1);
  }

  rollLegal(roll: number): boolean {
    return !(this.rolls.indexOf(roll) == -1);
  }

  rollsRemain(): boolean {
    return this.rolls.length > 0;
  }

  renderInConsole(): string {
    if (this.rolls.length === 0) {
      return "No moves left this turn";
    }
    return `dice: ${this.rolls.map((roll) => roll).join(", ")}`;
  }
}

export { Dice };
