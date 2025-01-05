import "reflect-metadata";
import { Board } from "./components/board";
import { ErrorBoundary } from "./components/error-boundary";
import { EndOfTurnOverlay } from "./components/end-of-turn-overlay";
import { ControlRow } from "./components/control-row";
import { BoardProvider } from "./controllers/board-provider";

const App: React.FC = () => {
  window.addEventListener("error", (event: ErrorEvent) => {
    event.preventDefault();
  });

  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      event.preventDefault();
    },
  );

  return (
    <>
      <ErrorBoundary>
        <BoardProvider>
          <Board />
          <EndOfTurnOverlay />
          <ControlRow />
        </BoardProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
