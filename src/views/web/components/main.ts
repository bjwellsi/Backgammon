import "reflect-metadata";
import { populateCommands } from "./command-events";
import { displayBoard } from "./display-board";
import Board from "../../../models/board";
import { handleError } from "./handle-error";

//this order needs to change. Currently you're making a board, to then make the engine which makes a board so you can reload the board.
//Doesnt make sense
let board = new Board();

displayBoard(board);

window.addEventListener("error", (event: ErrorEvent) => {
  handleError(event.error);
});

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    handleError(event.reason);
  },
);
