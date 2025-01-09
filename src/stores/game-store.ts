import { create } from "zustand";
import { Board } from "../models/board";

type BoardStore = {
  board: Board;
  updateBoard: (newBoard: Board) => void;
};

const useBoardStore = create<BoardStore>((set) => ({
  board: new Board(),
  updateBoard: (newBoard: Board) => {
    set({ board: newBoard });
  },
}));

export { useBoardStore };
