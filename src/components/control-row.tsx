import { rollDice } from "../controllers/game-engine";
import { Saves } from "./saves";

const ControlRow: React.FC = () => {
  const ret = (
    <>
      <div className="control-row">
        <button id="roll-dice" onClick={rollDice}>
          Roll
        </button>
        <button
          id="reset-turn"
          onClick={() => {
            console.log("todo");
          }}
        >
          Reset Turn
        </button>
        <button id="end-game" onClick={() => console.log("todo")}>
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
