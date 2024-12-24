import "reflect-metadata";
import { displayBoard } from "./display-board";
import { handleError } from "./handle-error";

displayBoard();

window.addEventListener("error", (event: ErrorEvent) => {
  handleError(event.error);
});

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    handleError(event.reason);
  },
);
