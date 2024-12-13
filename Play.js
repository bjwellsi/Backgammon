import GameControlFlow from "./GameControlFlow.js";

async function play() {
  let game = new GameControlFlow();
  while (1 == 1) {
    await game.playGame();
  }
}

export default play;
