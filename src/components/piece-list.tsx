import { Color } from "../models/color";
import { Piece } from "./piece";
import { Piece as PieceModel } from "../models/piece";

const PieceList: React.FC<{ pieceList: PieceModel[] }> = ({ pieceList }) => {
  let pieces = pieceList.map((piece) => {
    return <Piece piece={piece} />;
  });
  let ret = (
    <>
      <div key="piece-list" className={`piece-list piece-contaier`}>
        {pieces}
      </div>
    </>
  );
  return ret;
};

export { PieceList };
