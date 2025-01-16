import { selectPieceList } from "../controllers/ui-functions";
import { Jail as JailModel } from "../models/jail";
import { useUIStore } from "../stores/ui-store";
import { PieceList } from "./piece-list";

const Jail: React.FC<{ jail: JailModel }> = ({ jail }) => {
  const id = jail.id;
  const selected = useUIStore((state) => state.fromList);

  let highlighted = "";
  if (selected && selected.equals(id)) {
    highlighted = "highlighted";
  }
  return (
    <>
      <div
        id={id.value}
        className={`jail piece-container ${highlighted}`}
        onClick={() => {
          selectPieceList(id);
        }}
      >
        <PieceList pieceList={jail.pieces} />
      </div>
    </>
  );
};

export { Jail };
