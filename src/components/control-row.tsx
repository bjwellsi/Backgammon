import { useBoard } from "../controllers/board-provider";
import { useSaves } from "../controllers/save-provider";
import { Saves } from "./saves";

const ControlRow: React.FC = () => {
  const { rollDice, resetBoard, updateBoard } = useBoard();
  const { loadTurnStart } = useSaves();
  const ret = (
    <>
      <div className="control-row">
        <button id="roll-dice" onClick={rollDice}>
          Roll
        </button>
        <button
          id="reset-turn"
          onClick={() => {
            const board = loadTurnStart();
            if (!board) {
              throw Error("Save not loading\n");
            } else {
              updateBoard(board);
            }
          }}
        >
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
