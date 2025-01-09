import { nextTurn } from "../controllers/game-engine";

const EndOfTurnOverlay: React.FC = () => {
  const ret = (
    <>
      <div id="change-turn-overlay" className="overlay show-overlay">
        <div id="change-turn-popup" className="popup show-popup">
          <button id="change-turn" onClick={nextTurn}>
            Change Turn
          </button>
          <button
            id="reset-turn"
            onClick={() => {
              console.log("todo");
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
