import { Color } from "../models/color";
import { Piece as PieceModel } from "../models/piece";

const Piece: React.FC<{ piece: PieceModel }> = ({ piece }) => {
  let ret = (
    <>
      <div className={`piece ${Color[piece.color].toLowerCase()}`}></div>
    </>
  );

  return ret;
};

export { Piece };
