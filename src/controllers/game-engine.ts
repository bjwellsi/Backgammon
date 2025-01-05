import { Board } from "../models/board";
import { TurnAction } from "../models/turn-action";

function movePiece(board: Board, move: TurnAction): Board {
  const newBoard = board.clone();
  newBoard.processTurnAction(move);
  return newBoard;
}

function rollDice(board: Board): Board {
  const newBoard = board.clone();
  newBoard.rollDice();
  return newBoard;
}

function nextTurn(board: Board): Board {
  const newBoard = board.clone();
  newBoard.changeTurn();
  return newBoard;
}

export { rollDice, nextTurn, movePiece };
