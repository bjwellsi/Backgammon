import { Board } from "../models/board";
import { TurnAction } from "../models/turn-action";
import { useBoardStore } from "../stores/game-store";

function movePiece(action: TurnAction): void {
  const board = useBoardStore.getState().board;
  const newBoard = board.clone();
  newBoard.processTurnAction(action);
  useBoardStore.setState({ board: newBoard });
}

function rollDice(): void {
  const board = useBoardStore.getState().board;
  const newBoard = board.clone();
  newBoard.rollDice();
  useBoardStore.setState({ board: newBoard });
}

function nextTurn(): void {
  const board = useBoardStore.getState().board;
  const newBoard = board.clone();
  newBoard.changeTurn();
  useBoardStore.setState({ board: newBoard });
}

export { rollDice, nextTurn, movePiece };
