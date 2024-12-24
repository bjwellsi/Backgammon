import Board from "../models/board";
import { getBoard } from "./board-provider";
import TurnAction from "../models/turn-action";

function move(move: TurnAction): void {
  getBoard().processTurnAction(move);
}

function endGame(): void {
  let board = getBoard();
  board = new Board();
}

function roll(): void {
  getBoard().rollDice();
}

function changeTurn(): void {
  getBoard().changeTurn();
}

export { endGame, roll, changeTurn, move };
