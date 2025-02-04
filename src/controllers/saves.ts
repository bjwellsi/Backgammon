import "reflect-metadata";
import { serialize, deserialize } from "class-transformer";
import { Board } from "../models/board";
import { useBoardStore } from "../stores/game-store";
import { supabase } from "../config/supabaseClient";

function saveBoard(saveName: string): void {
  const save = async (board: string, save: string) => {
    //insert or update
    const { data } = await supabase
      .from("SaveGames")
      .select("save_name")
      .eq("save_name", save)
      .limit(1)
      .single();

    if (!data || !data.save_name) {
      const { data } = await supabase
        .from("SaveGames")
        .insert([{ board: board, save_name: save }])
        .select();

      if (!data) {
        throw Error(`Couldn't save ${save}`);
      }
    } else {
      //update
      const { data } = await supabase
        .from("SaveGames")
        .update({ board: board })
        .eq("save_name", save)
        .select();

      if (!data) {
        throw Error(`Couldn't save ${save}`);
      }
    }
  };
  const board = useBoardStore.getState().board;
  const content = serialize(board);
  save(content, saveName);
}

function loadBoard(saveName: string): void {
  const load = async (save: string) => {
    const { data } = await supabase
      .from("SaveGames")
      .select("board")
      .eq("save_name", save)
      .limit(1)
      .single();

    if (data) {
      const board = deserialize(Board, data.board);
      useBoardStore.setState({ board: board });
    } else {
      throw Error(`Couldn't load ${save}`);
    }
  };
  load(saveName);
}

function manualSave(): void {
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
