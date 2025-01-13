import "reflect-metadata";
import { Board } from "./components/board";
import { ErrorBoundary } from "./components/error-boundary";
import { ControlRow } from "./components/control-row";
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
        <SaveProvider>
          <Board />
          <ControlRow />
        </SaveProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
