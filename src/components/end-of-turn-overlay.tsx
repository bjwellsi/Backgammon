import { resetBoard } from "../controllers/board-provider";
import { changeTurn } from "./actions/command-events";

const EndOfTurnOverlay: React.FC = () => {
  let ret = (
    <>
      <div id="change-turn-overlay" className="overlay">
        <div id="change-turn-popup" className="popup">
          <button id="change-turn" onClick={() => changeTurn()}>
            Change Turn
          </button>
          <button id="reset-turn" onClick={() => resetBoard()}>
            Reset Turn
          </button>
        </div>
      </div>
    </>
  );

  return ret;
};

export { EndOfTurnOverlay };
