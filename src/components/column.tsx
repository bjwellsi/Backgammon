import { PieceList } from "./piece-list";
import { getBoard } from "../controllers/board-provider";

const Column: React.FC<{ columnIndex: number }> = ({ columnIndex }) => {
  let column = getBoard().columns[columnIndex];
  let id = `column-${columnIndex}`;

  let oddOrEven = "odd";
  if (columnIndex % 2 > 0) {
    oddOrEven = "even";
  }
  let topOrBottom = "top";
  if (columnIndex > 11) {
    topOrBottom = "bottom";
  }
  let ret = (
    <>
      <div
        key={id}
        id={id}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom}`}
      >
        <PieceList pieceList={column.pieces} />
        <div
          key="triangle"
          className={`triangle piece-contaier ${oddOrEven} ${topOrBottom}`}
        ></div>
      </div>
    </>
  );
  return ret;
};

export { Column };
