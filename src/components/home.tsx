import { selectPieceList } from "../controllers/ui-functions";
import { Home as HomeModel } from "../models/home";
import { useUIStore } from "../stores/ui-store";
import { PieceList } from "./piece-list";

const Home: React.FC<{ home: HomeModel }> = ({ home }) => {
  const id = home.id;
  const selected = useUIStore((state) => state.fromList);

  let highlighted = "";
  if (selected && selected.equals(id)) {
    highlighted = "highlighted";
  }
  return (
    <>
      <div
        id={id.value}
        className={`home piece-container ${highlighted}`}
        onClick={() => {
          selectPieceList(id);
        }}
      >
        <PieceList pieceList={home.pieces} />
      </div>
    </>
  );
};

export { Home };
