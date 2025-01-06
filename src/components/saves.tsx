import { useBoard } from "../controllers/board-provider";
import {
  deleteSave,
  listSaves,
  loadAutoSave,
  loadBoard,
  manualSave,
} from "../controllers/save-game";

const DisplaySaves: React.FC = () => {
  const saves = listSaves();
  const { updateBoard } = useBoard();
  const loadGame = (save: string) => {
    const board = loadBoard(save);
    if (!board) {
      throw Error("No board loaded\n");
    }
    updateBoard(board);
  };

  const resetTurn = () => {
    const board = loadAutoSave();
    if (!board) {
      throw Error("Auto save missing\n");
    }
    const { updateBoard } = useBoard();
    updateBoard(board);
  };
  return (
    <>
      <ul id="save-names">
        {saves.map((save) => {
          return (
            <li key={save}>
              <button onClick={() => loadGame(save)}>{save}</button>
              <button onClick={() => deleteSave(save)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Saves: React.FC = () => {
  const { board } = useBoard();

  const makeNewSave = () => {
    manualSave(board);
  };

  const ret = (
    <>
      <div id="save-section">
        <button id="new-save" onClick={makeNewSave}>
          New Save
        </button>
        <DisplaySaves />
      </div>
    </>
  );
  return ret;
};

export { Saves };
