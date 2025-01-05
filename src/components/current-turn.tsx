import { useBoard } from "../controllers/board-provider";
import { Color } from "../models/color";

const CurrentTurn: React.FC = () => {
  const { board } = useBoard();
  let ret = (
    <>
      <h2 id="turn">{Color[board.currentTeam.color]}'s turn</h2>
    </>
  );

  return ret;
};

export { CurrentTurn };
