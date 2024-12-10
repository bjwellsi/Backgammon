class TurnAction {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.actionLegal = null;
    this.errorMessage = null;
    this.rollCost = null;
  }

  fromJail() {
    return this.from == -1;
  }

  toHome() {
    return this.to == -2;
  }

  canMove(rollCost) {
    this.actionLegal = true;
    this.rollCost = rollCost;
  }

  cannotMove(errorMessage) {
    this.actionLegal = false;
    this.errorMessage = errorMessage;
  }
}

export default TurnAction;
