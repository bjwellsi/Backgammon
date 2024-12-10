import Chance from "chance";

class Dice {
  constructor() {
    this.rolls = [];
    this.chance = new Chance();
  }

  rollForIniative() {
    this.clearRolls();
    let die = this.chance.integer({ min: 1, max: 6 });
    this.rolls.push(die);
    return die;
  }

  roll() {
    let die1 = this.chance.integer({ min: 1, max: 6 });
    let die2 = this.chance.integer({ min: 1, max: 6 });

    this.rolls.push(die1);
    this.rolls.push(die2);

    if (die1 == die2) {
      this.rolls.push(die1);
      this.rolls.push(die2);
    }

    return this.rolls.slice(0, 2);
  }

  clearRolls() {
    this.rolls = [];
  }

  addRoll(roll) {
    this.rolls.push(roll);
  }

  maxRoll() {
    return this.rolls.sort((a, b) => a - b)[0];
  }

  useRoll(roll) {
    if (!this.rollLegal(roll)) {
      throw Error("roll not available");
    }

    this.rolls.splice(this.rolls.indexOf(roll), 1);
  }

  rollLegal(roll) {
    return !(this.rolls.indexOf(roll) == -1);
  }

  rollsRemain() {
    return this.rolls.length > 0;
  }

  renderInConsole() {
    if (this.rolls.length === 0) {
      return "No moves left this turn";
    }
    return `dice: ${this.rolls.map((roll) => roll).join(", ")}`;
  }
}

export default Dice;
