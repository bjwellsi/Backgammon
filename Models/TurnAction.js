class TurnAction {
  constructor(from, to) {
    this._from = from;
    this._to = to;
    this.actionLegal = null;
    this.errorMessage = null;
    this.rollCost = null;
  }

  get from() {
    return this._from;
  }

  set from(from) {
    if (from === "jail") {
      this.fromJail = true;
    } else {
      this._from = from;
    }
  }

  get to() {
    return this._to;
  }

  set to(to) {
    if (to === "home") {
      this.toHome = true;
    } else {
      this._to = to;
    }
  }

  get fromJail() {
    return this.from == -1;
  }

  set fromJail(fromJail) {
    if (fromJail) {
      this.from = -1;
    } else {
      //do nothing
      return;
    }
  }

  get toHome() {
    return this.to == -2;
  }

  set toHome(toHome) {
    if (toHome) {
      this.to = -2;
    } else {
      //do nothing
      return;
    }
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
