import GameEngine from "./game-engine";

async function playGame(): Promise<void> {
  let winner = this.board.winner;
  while (winner === undefined) {
    displayBoard(this.board);
    try {
      let command = await this.view.processInput();
      if ((await this.performUserAction(command)) == "game") {
        winner = "NOBODY";
        break;
      }
    } catch (error) {
      this.view.processError(error);
    }
    winner = this.board.winner;
  }

  this.view.declareWinner(winner);
}
async function play(): Promise<void> {
  while (1 == 1) {
    let game: GameEngine = new GameEngine();
    await game.playGame();
  }
}

export default play;
