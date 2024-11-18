import chance from "chance";

class Dice {
  constructor() {
    this.rolls = [];
  }

  rollForIniative() {
    return chance.integer({ min: 1, max: 6 });
  }

  roll() {
    let die1 = chance.integer({ min: 1, max: 6 });
    let die2 = chance.integer({ min: 1, max: 6 });

    this.rolls.push(die1);
    this.rolls.push(die2);

    if (die1 == die2) {
      this.rolls.push(die1);
      this.rolls.push(die2);
    }

    return moves.slice(0, 2);
  }

  useRoll(roll) {
    if (this.rollLegal(roll)) {
      throw Error("roll not available");
    }

    this.rolls.splice(rollIndex, 1);
  }

  rollLegal(roll) {
    return !(this.rolls.indexOf(roll) == -1);
  }
}

export default Dice;
