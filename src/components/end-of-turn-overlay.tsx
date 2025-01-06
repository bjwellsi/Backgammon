import { useBoard } from "../controllers/board-provider";

const EndOfTurnOverlay: React.FC = () => {
  const { resetBoard, changeTurn } = useBoard();
  const ret = (
    <>
      <div id="change-turn-overlay" className="overlay show-overlay">
        <div id="change-turn-popup" className="popup show-popup">
          <button id="change-turn" onClick={changeTurn}>
            Change Turn
          </button>
          <button id="reset-turn" onClick={() => console.log("todo")}>
            Reset Turn
          </button>
        </div>
      </div>
    </>
  );

  return ret;
};

export { EndOfTurnOverlay };
