import "reflect-metadata";
import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";
import { useBoardStore } from "../stores/game-store";

function saveBoard(saveName: string): void {
  const board = useBoardStore.getState().board;
  const content = serialize(board);
  localStorage.setItem(saveName, content);
}

function loadBoard(saveName: string): void {
  const content = localStorage.getItem(saveName);
  if (content) {
    const board = deserialize(Board, content);
    useBoardStore.setState({ board: board });
  } else {
    throw Error(`Couldn't load ${saveName}`);
  }
}

function manualSave(): void {
  console.log("asdfd");
  saveBoard("manualSave");
}

function loadManualSave(): void {
  loadBoard("manualSave");
}

function autoSave(): void {
  saveBoard("auto");
}

function loadAutoSave(): void {
  loadBoard("auto");
}

function lastMoveSave(): void {
  saveBoard("lastMove");
}

function undoLastMove(): void {
  loadBoard("lastMove");
}

function saveTurnStart(): void {
  saveBoard("autoturn");
}

function resetTurn(): void {
  loadBoard("autoturn");
}

function deleteSave(save: string): void {
  const existingSave = localStorage.getItem(save);
  if (!existingSave) {
    throw Error("No save with that name found");
  } else {
    localStorage.removeItem(save);
  }
}

export {
  manualSave,
  loadManualSave,
  autoSave,
  loadAutoSave,
  saveTurnStart,
  resetTurn,
  lastMoveSave,
  undoLastMove,
};
