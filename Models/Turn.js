class Turn {
  constructor() {
    this.currentTeamIndex = null;
    this.currentOpponentIndex = null;

    this._rolled = false;
  }

  get rolled() {
    return _rolled;
  }

  roll() {
    if (this._rolled == true) {
      throw new Error("Already rolled the dice this turn\n");
    }
    this._rolled = true;
  }

  nextTurn(nextTeam, nextOpponent) {
    this.currentTeamIndex = nextTeam;
    this.currentOpponentIndex = nextOpponent;
    this._rolled = false;
  }
}

export default Turn;
