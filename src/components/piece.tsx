import { Color } from "../models/color";
import { Piece as PieceModel } from "../models/piece";

const Piece: React.FC<{ piece: PieceModel }> = ({ piece }) => {
  const id = piece.id;
  let ret = (
    <>
      <div
        id={id}
        className={`piece ${Color[piece.color].toLowerCase()}`}
      ></div>
    </>
  );

  return ret;
};

export { Piece };
