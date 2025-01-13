import { selectPieceList } from "../controllers/ui-functions";
import { Column as ColumnModel } from "../models/column";
import { useUIStore } from "../stores/ui-store";
import { PieceList } from "./piece-list";

const Column: React.FC<{ columnModel: ColumnModel }> = ({ columnModel }) => {
  const id = columnModel.id;
  const selected = useUIStore((state) => state.fromList);

  let highlighted = "";
  if (selected && selected.equals(id)) {
    highlighted = "highlighted";
  }

  const columnIndex = columnModel.locationIndex;
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
        id={id.value}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom} ${highlighted}`}
        onClick={() => {
          selectPieceList(id);
        }}
      >
        <PieceList pieceList={columnModel.pieces} />
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
