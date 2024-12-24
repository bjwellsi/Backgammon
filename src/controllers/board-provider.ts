import Board from "../models/board";

let board: Board | null;

function getBoard(): Board {
  if (!board) {
    board = new Board();
  }

  return board;
}

function updateBoard(newBoard: Board): void {
  board = newBoard;
}

function resetBoard(): void {
  updateBoard(new Board());
}

export { getBoard, updateBoard, resetBoard };
