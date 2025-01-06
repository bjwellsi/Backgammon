import { useBoard } from "../controllers/board-provider";
import { useSaves } from "../controllers/save-provider";

const EndOfTurnOverlay: React.FC = () => {
  const { changeTurn } = useBoard();
  const { loadAutoSave } = useSaves();

  const ret = (
    <>
      <div id="change-turn-overlay" className="overlay show-overlay">
        <div id="change-turn-popup" className="popup show-popup">
          <button id="change-turn" onClick={changeTurn}>
            Change Turn
          </button>
          <button id="reset-turn" onClick={loadAutoSave}>
            Reset Turn
          </button>
        </div>
      </div>
    </>
  );

  return ret;
};

export { EndOfTurnOverlay };
