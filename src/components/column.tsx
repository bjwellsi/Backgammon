import { useBoard } from "../controllers/board-provider";
import { Column } from "../models/column";
import { PieceList } from "./piece-list";

const Column: React.FC<{ column: Column; columnIndex: number }> = ({
  column,
  columnIndex,
}) => {
  const { movePiece } = useBoard();
  const id = column.id;

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
        id={id}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom}`}
        onClick={(event) => {
          movePiece(event.currentTarget as HTMLDivElement);
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
