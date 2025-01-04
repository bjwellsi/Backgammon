import { Board } from "../models/board";
import { getBoard } from "./board-provider";
import { TurnAction } from "../models/turn-action";

function movePiece(move: TurnAction): void {
  getBoard().processTurnAction(move);
}

function endGame(): void {
  let board = getBoard();
  board = new Board();
}

function rollDice(): void {
  getBoard().rollDice();
}

function nextTurn(): void {
  getBoard().changeTurn();
}

export { endGame, rollDice, nextTurn, movePiece };
