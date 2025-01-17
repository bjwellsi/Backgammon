import "reflect-metadata";
import { Board } from "./components/board";
import { ErrorBoundary } from "./components/error-boundary";
import { ControlRow } from "./components/control-row";
import { initializeBoard } from "./controllers/game-engine";

const App: React.FC = () => {
  initializeBoard();
  window.addEventListener("error", (event: ErrorEvent) => {
    console.error(event.error);
    event.preventDefault();
  });

  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      console.error(event.reason);
      event.preventDefault();
    },
  );

  return (
    <>
      <ErrorBoundary>
        <Board />
        <ControlRow />
      </ErrorBoundary>
    </>
  );
};

export default App;
