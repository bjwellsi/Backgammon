class TurnAction {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  fromJail() {
    return this.from == -1;
  }

  toHome() {
    return this.to == -2;
  }
}

export default TurnAction;
