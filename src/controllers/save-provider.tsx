import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useBoard } from "./board-provider";

type SaveContextType = {
  saveList: string[];
  loadBoard: (saveName: string) => void;
  saveBoard: (saveName: string) => void;
  manualSave: () => void;
  autoSave: () => void;
  loadAutoSave: () => void;
  renameSave: (save: string, newName: string) => void;
  deleteSave: (save: string) => void;
};

const SaveContext = createContext<SaveContextType | undefined>(undefined);

const listSaves = (): string[] => {
  const saves = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key != "auto") {
      saves.push(key);
    }
  }
  return saves;
};

const genSaveName = (prefix: string): string => {
  const saves = listSaves();
  let saveName;
  let i = 0;
  while (!saveName) {
    const newName = `${prefix}${i}`;
    if (saves.indexOf(newName) < 0) {
      saveName = newName;
    }
    i++;
  }
  return saveName;
};

const SaveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { board, updateBoard } = useBoard();
  const [saveList, setSaveList] = useState(listSaves());

  const saveBoard = (saveName: string) => {
    const content = serialize(board);
    localStorage.setItem(saveName, content);
    setSaveList(listSaves());
  };

  const loadBoard = (saveName: string): void => {
    const content = localStorage.getItem(saveName);
    let board = null;
    if (content) {
      board = deserialize(Board, content);
    }
    if (board) {
      updateBoard(board);
    } else {
      throw Error("No board loaded\n");
    }
  };

  const manualSave = (): void => {
    const saveName = genSaveName("Save ");
    console.log(saveName);
    saveBoard(saveName);
  };

  const autoSave = (): void => {
    saveBoard("auto");
  };

  const loadAutoSave = (): void => {
    loadBoard("auto");
  };

  const renameSave = (save: string, newName: string): void => {
    const oldSave = localStorage.getItem(save);
    if (!oldSave) {
      throw Error("No save found\n");
    } else {
      const existingSave = localStorage.getItem(newName);
      if (existingSave) {
        throw Error("Save by that name already exists\n");
      } else {
        localStorage.removeItem(save);
        localStorage.setItem(newName, oldSave);
      }
    }
  };

  const deleteSave = (save: string): void => {
    const existingSave = localStorage.getItem(save);
    if (!existingSave) {
      throw Error("No save with that name found\n");
    } else {
      localStorage.removeItem(save);
      setSaveList(listSaves());
    }
  };

  const ret = (
    <SaveContext.Provider
      value={{
        saveList,
        loadBoard,
        saveBoard,
        manualSave,
        autoSave,
        loadAutoSave,
        renameSave,
        deleteSave,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
  return ret;
};

const useSaves = (): SaveContextType => {
  const context = useContext(SaveContext);

  if (!context) {
    throw new Error("useSaves must be used within a SaveProvider");
  }
  return context;
};

export { useSaves, SaveProvider };
