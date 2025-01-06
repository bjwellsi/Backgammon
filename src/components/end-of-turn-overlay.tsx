import { useBoard } from "../controllers/board-provider";
import { useSaves } from "../controllers/save-provider";

const EndOfTurnOverlay: React.FC = () => {
  const { changeTurn, updateBoard } = useBoard();
  const { loadTurnStart } = useSaves();

  const ret = (
    <>
      <div id="change-turn-overlay" className="overlay show-overlay">
        <div id="change-turn-popup" className="popup show-popup">
          <button id="change-turn" onClick={changeTurn}>
            Change Turn
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
        </div>
      </div>
    </>
  );

  return ret;
};

export { EndOfTurnOverlay };
