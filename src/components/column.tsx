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

  let leftOrRight = "right";
  if (columnIndex < 6 || columnIndex > 17) {
    leftOrRight = "left";
  }

  let gridColumn = columnIndex; //for the top row, you just take the column index;
  if (topOrBottom == "bottom") {
    gridColumn = 23 - columnIndex; //for the bottom row, we need distance from 23.
  }
  if (leftOrRight == "left") {
    gridColumn += 3; //shift 3 columns over for home + reference by 1
  } else if (leftOrRight == "right") {
    gridColumn += 4; //shift an extra 1 for jail
  }

  const ret = (
    <>
      <div
        id={id.value}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom} ${highlighted}`}
        onClick={() => {
          selectPieceList(id);
        }}
        style={{ gridColumn: gridColumn }}
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
