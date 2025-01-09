const Saves: React.FC = () => {
  const saveList: string[] = [];

  const ret = (
    <>
      <div id="save-section">
        <button id="new-save" onClick={() => console.log("todo")}>
          New Save
        </button>
        <ul id="save-names">
          {saveList.map((save) => {
            return (
              <li key={save}>
                <button
                  onClick={() => {
                    console.log("todo");
                  }}
                >
                  {save}
                </button>
                <button id="delete-save" onClick={() => console.log("todo")}>
                  Delete
                </button>
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
