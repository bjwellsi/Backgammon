import { Piece } from "./piece";
import { Piece as PieceModel } from "../models/piece";

const PieceList: React.FC<{ pieceList: PieceModel[] }> = ({ pieceList }) => {
  const pieces = pieceList.map((piece) => {
    return <Piece key={piece.id} piece={piece} />;
  });
  const ret = (
    <>
      <div className={`piece-list piece-contaier`}>{pieces}</div>
    </>
  );
  return ret;
};

export { PieceList };
