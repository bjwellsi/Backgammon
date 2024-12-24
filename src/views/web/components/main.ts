import "reflect-metadata";
import { displayBoard } from "./display-board";
import { handleError } from "./handle-error";
import getGameEngine from "../../../controllers/game-engine-provider";

displayBoard(getGameEngine().board);

window.addEventListener("error", (event: ErrorEvent) => {
  handleError(event.error);
});

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    handleError(event.reason);
  },
);
