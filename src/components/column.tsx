import { selectPieceList } from "../controllers/ui-functions";
import { Column as ColumnModel } from "../models/column";
import { useBoardStore } from "../stores/game-store";
import { useUIStore } from "../stores/ui-store";
import { PieceList } from "./piece-list";

const Column: React.FC<{ column: ColumnModel; columnIndex: number }> = ({
  column,
  columnIndex,
}) => {
  const id = column.id;
  const selected = useUIStore((state) => state.action.from);

  let highlighted = "";
  if (selected == id) {
    highlighted = "highlighted";
  }

  let oddOrEven = "odd";
  if (columnIndex % 2 > 0) {
    oddOrEven = "even";
  }
  let topOrBottom = "top";
  if (columnIndex > 11) {
    topOrBottom = "bottom";
  }
  const ret = (
    <>
      <div
        id={id}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom} ${highlighted}`}
        onClick={() => {
          selectPieceList(id);
        }}
      >
        <PieceList pieceList={column.pieces} />
        <div
          key="triangle"
          className={`triangle ${oddOrEven} ${topOrBottom}`}
        ></div>
      </div>
    </>
  );
  return ret;
};

export { Column };
