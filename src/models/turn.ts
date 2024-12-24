class Turn {
  currentTeamIndex: number | null;
  currentOpponentIndex: number | null;
  rolled: boolean | null;

  constructor() {
    this.currentTeamIndex = null;
    this.currentOpponentIndex = null;

    this.rolled = false;
  }

  roll(): void {
    if (this.rolled == true) {
      throw new Error("Already rolled the dice this turn\n");
    }
    this.rolled = true;
  }

  nextTurn(nextTeam: number, nextOpponent: number): void {
    this.currentTeamIndex = nextTeam;
    this.currentOpponentIndex = nextOpponent;
    this.rolled = false;
  }
}

export default Turn;
