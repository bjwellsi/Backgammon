import { endGame, rollDice } from "./actions/command-events";
import { Saves } from "./saves";

const ControlRow: React.FC = () => {
  let ret = (
    <>
      <div className="control-row">
        <button id="roll-dice" onClick={() => rollDice()}>
          Roll
        </button>
        <button id="reset-turn" onClick={() => resetTurn()}>
          Reset Turn
        </button>
        <button id="end-game" onClick={() => endGame()}>
          End Game
        </button>
        <br />
        <Saves />
      </div>
    </>
  );

  return ret;
};

export { ControlRow };
