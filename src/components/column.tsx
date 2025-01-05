import { useBoard } from "../controllers/board-provider";
import { PieceList } from "./piece-list";

const Column: React.FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const { board, movePiece } = useBoard();
  const column = board.columns[columnIndex];
  const id = `column-${columnIndex}`;

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
