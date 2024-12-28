import "reflect-metadata";
import { DisplayBoard } from "./components/display-board";
import { clearError, handleError } from "./components/handle-error";
import { endGame, nextTurn, rollDice } from "./controllers/game-engine";
import { resetBoard } from "./controllers/board-provider";
import { makeNewSave, resetTurn } from "./components/display-save-options";

const App: React.FC = () => {
  window.addEventListener("error", (event: ErrorEvent) => {
    handleError(event.error);
  });

  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      handleError(event.reason);
    },
  );

  return (
    <>
      <div id="error-overlay" className="overlay" onClick={() => clearError()}>
        <div
          id="error-popup"
          className="popup"
          onClick={() => clearError()}
        ></div>
      </div>
      <DisplayBoard />
      <div id="change-turn-overlay" className="overlay">
        <div id="change-turn-popup" className="popup">
          <button id="change-turn" onClick={() => nextTurn()}>
            Change Turn
          </button>
          <button id="reset-turn" onClick={() => resetBoard()}>
            Reset Turn
          </button>
        </div>
      </div>
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
        <div id="save-section">
          <button id="new-save" onClick={() => makeNewSave()}>
            New Save
          </button>
          <ul id="save-names"></ul>
        </div>
      </div>
    </>
  );
};

export default App;
