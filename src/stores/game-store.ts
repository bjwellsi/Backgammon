import { create } from "zustand";
import { Board } from "../models/board";

type BoardStore = {
  board: Board;
  updateBoard: (newBoard: Board) => void;
  selectedPieceStore: string | null;
  updateSelectedPieceStore: (newList: string) => void;
  unselectPieceStore: () => void;
};

const useBoardStore = create<BoardStore>((set) => ({
  board: new Board(),
  updateBoard: (newBoard: Board) => {
    set({ board: newBoard });
  },
  selectedPieceStore: null,
  updateSelectedPieceStore: (newList: string) => {
    set({ selectedPieceStore: newList });
  },
  unselectPieceStore: () => {
    set({ selectedPieceStore: null });
  },
}));

export { useBoardStore };
