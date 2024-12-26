import "reflect-metadata";
import { displayBoard } from "./display-board";
import { clearError, handleError } from "./handle-error";

displayBoard();

document.getElementById("error-overlay")?.addEventListener("click", clearError);

window.addEventListener("error", (event: ErrorEvent) => {
  handleError(event.error);
});

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    handleError(event.reason);
  },
);
