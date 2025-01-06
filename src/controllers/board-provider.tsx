import React, { createContext, useContext, useState } from "react";
import { Board as BoardModel } from "../models/board";
import { TurnAction } from "../models/turn-action";
import {
  movePiece as movePieceEngine,
  rollDice as rollDiceEngine,
  nextTurn as nextTurnEngine,
} from "./game-engine";
import { useSaves } from "./save-provider";

type BoardContextType = {
  board: BoardModel;
  resetBoard: () => void;
  updateBoard: (board: BoardModel) => void;
  movePiece: (currentDiv: HTMLDivElement) => void;
  rollDice: () => void;
  changeTurn: () => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

function getContainerID(div: HTMLDivElement): number | string {
  if (div.classList.contains("jail")) {
    return "jail";
  } else if (div.classList.contains("home")) {
    return "home";
  } else {
    const id = div.id;
    const ret = Number(id.replace("column-", ""));
    if (isNaN(ret)) {
      throw Error("Invalid container id format\n");
    }
    return ret;
  }
}

const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { autoSave, loadAutoSave, saveTurnStart } = useSaves();
  let initialBoard = loadAutoSave();
  if (!initialBoard) {
    initialBoard = new BoardModel();
  }
  const [board, setBoard] = useState(initialBoard);

  const resetBoard = () => {
    setBoard(new BoardModel());
  };

  let selectedDiv: HTMLDivElement | null;

  const handleMovePiece = (currentDiv: HTMLDivElement) => {
    if (selectedDiv == null) {
      selectedDiv = currentDiv;
      selectedDiv.classList.add("highlighted");
    } else {
      //create a turn action
      const from = getContainerID(selectedDiv);
      const to = getContainerID(currentDiv);
      const action = new TurnAction(from, to);
      selectedDiv.classList.remove("highlighted");
      selectedDiv = null;

      setBoard((prevBoard) => movePieceEngine(prevBoard, action));
      autoSave(board);
    }
  };

  const handleDiceRoll = () => {
    setBoard((prevBoard) => rollDiceEngine(prevBoard));
    autoSave(board);
    saveTurnStart(board);
  };

  const handleTurnChange = () => {
    setBoard((prevBoard) => nextTurnEngine(prevBoard));
    autoSave(board);
    saveTurnStart(board);
  };

  const updateBoard = (board: BoardModel) => {
    setBoard(board);
    autoSave(board);
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        resetBoard,
        updateBoard,
        movePiece: handleMovePiece,
        rollDice: handleDiceRoll,
        changeTurn: handleTurnChange,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};

export { useBoard, BoardProvider };
