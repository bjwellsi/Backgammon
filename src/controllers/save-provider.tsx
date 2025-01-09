import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";
import React, { createContext, ReactNode, useContext, useState } from "react";

type SaveContextType = {
  saveList: string[];
  loadBoard: (saveName: string) => Board | null;
  saveBoard: (saveName: string, board: Board) => void;
  manualSave: (board: Board) => void;
  autoSave: (board: Board) => void;
  loadAutoSave: () => Board | null;
  saveTurnStart: (board: Board) => void;
  loadTurnStart: () => Board | null;
  renameSave: (save: string, newName: string) => void;
  deleteSave: (save: string) => void;
};

const SaveContext = createContext<SaveContextType | undefined>(undefined);

const listSaves = (): string[] => {
  const saves = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key != "auto" && key != "autoturn") {
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
  const [saveList, setSaveList] = useState(listSaves());

  const saveBoard = (saveName: string, board: Board) => {
    const content = serialize(board);
    localStorage.setItem(saveName, content);
    setSaveList(listSaves());
  };

  const loadBoard = (saveName: string): Board | null => {
    const content = localStorage.getItem(saveName);
    if (content) {
      return deserialize(Board, content);
    } else {
      return null;
    }
  };

  const manualSave = (board: Board): void => {
    const saveName = genSaveName("Save ");
    saveBoard(saveName, board);
  };

  const autoSave = (board: Board): void => {
    saveBoard("auto", board);
  };

  const loadAutoSave = (): Board | null => {
    return loadBoard("auto");
  };

  const saveTurnStart = (board: Board): void => {
    saveBoard("autoturn", board);
  };

  const loadTurnStart = (): Board | null => {
    return loadBoard("autoturn");
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
        saveTurnStart,
        loadTurnStart,
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
