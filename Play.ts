import GameControlFlow from "./GameControlFlow";

async function play(): Promise<void> {
  let game: GameControlFlow = new GameControlFlow();
  while (1 == 1) {
    await game.playGame();
  }
}

export default play;
