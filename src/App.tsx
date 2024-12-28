import "reflect-metadata";
import { DisplayBoard } from "./components/display-board";
import { clearError, handleError } from "./components/handle-error";

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
          <button id="change-turn">Change Turn</button>
          <button id="reset-turn">Reset Turn</button>
        </div>
      </div>
      <div className="control-row">
        <button id="roll-dice">Roll</button>
        <button id="reset-turn">Reset Turn</button>
        <button id="end-game">End Game</button>
        <br />
        <div id="save-section">
          <button id="new-save">New Save</button>
          <ul id="save-names"></ul>
        </div>
      </div>
    </>
  );
};

export default App;
