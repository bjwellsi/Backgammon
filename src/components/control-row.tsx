import { useBoard } from "../controllers/board-provider";
import { Saves } from "./saves";

const ControlRow: React.FC = () => {
  const { rollDice, resetBoard } = useBoard();
  const ret = (
    <>
      <div className="control-row">
        <button id="roll-dice" onClick={rollDice}>
          Roll
        </button>
        <button id="reset-turn" onClick={() => console.log("todo")}>
          Reset Turn
        </button>
        <button id="end-game" onClick={resetBoard}>
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
