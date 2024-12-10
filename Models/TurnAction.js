class TurnAction {
  constructor(from, to) {
    if (from === "jail") {
      this.setFromJail();
    }
    if (to === "home") {
      this.setToHome();
    }
    this.from = from;
    this.to = to;
    this.actionLegal = null;
    this.errorMessage = null;
    this.rollCost = null;
  }

  getFromJail() {
    return this.from == -1;
  }

  setFromJail() {
    this.from = -1;
  }

  getToHome() {
    return this.to == -2;
  }

  setToHome() {
    this.to = -2;
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
