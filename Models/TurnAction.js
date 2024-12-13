class TurnAction {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.actionLegal = null;
    this.errorMessage = null;
    this.rollCost = null;
  }

  get from() {
    return this._from;
  }

  set from(from) {
    if (from == "jail") {
      this._from = -1;
    } else {
      this._from = from;
    }
  }

  get to() {
    return this._to;
  }

  set to(to) {
    if (to == "home") {
      this._to = -2;
    } else {
      this._to = to;
    }
  }

  get fromJail() {
    return this._from == -1;
  }

  get toHome() {
    return this._to == -2;
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
