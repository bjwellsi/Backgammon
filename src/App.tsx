import "reflect-metadata";
import { Board } from "./components/board";
import { handleError } from "./components/actions/handle-error";
import { ErrorOverlay } from "./components/error-overlay";
import { EndOfTurnOverlay } from "./components/end-of-turn-overlay";
import { ControlRow } from "./components/control-row";

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
      <ErrorOverlay />
      <Board />
      <EndOfTurnOverlay />
      <ControlRow />
    </>
  );
};

export default App;
