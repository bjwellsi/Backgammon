import GameEngine from "./game-engine";

async function play(): Promise<void> {
  while (1 == 1) {
    let game: GameEngine = new GameEngine();
    await game.playGame();
  }
}

export default play;
