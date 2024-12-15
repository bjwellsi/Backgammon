class Turn {
  currentTeamIndex: number | null;
  currentOpponentIndex: number | null;
  private _rolled: boolean | null;

  constructor() {
    this.currentTeamIndex = null;
    this.currentOpponentIndex = null;

    this._rolled = false;
  }

  roll(): void {
    if (this._rolled == true) {
      throw new Error("Already rolled the dice this turn\n");
    }
    this._rolled = true;
  }

  nextTurn(nextTeam: number, nextOpponent: number): void {
    this.currentTeamIndex = nextTeam;
    this.currentOpponentIndex = nextOpponent;
    this._rolled = false;
  }
}

export default Turn;
