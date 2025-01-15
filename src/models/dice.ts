import Chance from "chance";
import { Exclude } from "class-transformer";

class Dice {
  rolls: number[];
  @Exclude()
  private _chance: Chance;

  constructor() {
    this.rolls = [];
    this._chance = new Chance();
  }

  rollForIniative(): number {
    this.clearRolls();
    const die = this._chance.integer({ min: 1, max: 6 });
    this.rolls.push(die);
    return die;
  }

  roll(): number[] {
    const die1 = this._chance.integer({ min: 1, max: 6 });
    const die2 = this._chance.integer({ min: 1, max: 6 });

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
}

export { Dice };
