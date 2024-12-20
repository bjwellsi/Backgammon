import "reflect-metadata";
import { movePiece } from "./modify-board";
import { displayBoard } from "./display-board";
import Board from "../../../models/board";
let board = new Board();
console.log("board");
console.log(board);
displayBoard(board);

document.querySelectorAll<HTMLDivElement>(".piece-container").forEach((div) => {
  div.addEventListener("click", movePiece);
});
