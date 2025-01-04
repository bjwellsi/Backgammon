import { makeNewSave, resetTurn } from "./actions/display-save-options";

const Saves: React.FC = () => {
  let ret = (
    <>
      <div id="save-section">
        <button id="new-save" onClick={() => makeNewSave()}>
          New Save
        </button>
        <ul id="save-names"></ul>
      </div>
    </>
  );
  return ret;
};

export { Saves };
