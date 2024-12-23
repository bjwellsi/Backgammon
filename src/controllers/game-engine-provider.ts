import GameEngine from "./game-engine";

//this is how we do singletons in js
let instance: GameEngine | null = null;

function getGameEngine(): GameEngine {
  if (!instance) {
    instance = new GameEngine();
  }
  return instance;
}

export default getGameEngine;
