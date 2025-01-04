import { getBoard } from "../controllers/board-provider";
import { Color } from "../models/color";

const CurrentTurn: React.FC = () => {
  let ret = (
    <>
      <h2 id="turn">{Color[getBoard().currentTeam.color]}'s turn</h2>
    </>
  );

  return ret;
};

export { CurrentTurn };
