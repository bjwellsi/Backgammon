import "reflect-metadata";
import { Board } from "./components/board";
import { ErrorBoundary } from "./components/error-boundary";
import { EndOfTurnOverlay } from "./components/end-of-turn-overlay";
import { ControlRow } from "./components/control-row";
import { BoardProvider } from "./controllers/board-provider";
import { SaveProvider } from "./controllers/save-provider";

const App: React.FC = () => {
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
        <BoardProvider>
          <SaveProvider>
            <Board />
            <ControlRow />
          </SaveProvider>
        </BoardProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
