import GameControlFlow from "./game-control-flow";
import "reflect-metadata";

async function play(): Promise<void> {
  while (1 == 1) {
    let game: GameControlFlow = new GameControlFlow();
    await game.playGame();
  }
}

export default play;
