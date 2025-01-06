import { useBoard } from "../controllers/board-provider";
import { useSaves } from "../controllers/save-provider";

const Saves: React.FC = () => {
  const {} = useSaves();
  const { board, updateBoard } = useBoard();
  const { saveList, manualSave, loadBoard, deleteSave } = useSaves();

  const ret = (
    <>
      <div id="save-section">
        <button id="new-save" onClick={() => manualSave(board)}>
          New Save
        </button>
        <ul id="save-names">
          {saveList.map((save) => {
            return (
              <li key={save}>
                <button
                  onClick={() => {
                    const board = loadBoard(save);
                    if (!board) {
                      throw Error("Save not loading\n");
                    } else {
                      updateBoard(board);
                    }
                  }}
                >
                  {save}
                </button>
                <button onClick={() => deleteSave(save)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
  return ret;
};

export { Saves };
