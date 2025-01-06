import { useBoard } from "../controllers/board-provider";
import { Color } from "../models/color";
import { EndOfTurnOverlay } from "./end-of-turn-overlay";

const CurrentTurn: React.FC = () => {
  const { board } = useBoard();
  const ret = (
    <>
      <h2 id="turn">{Color[board.currentTeam.color]}'s turn</h2>
      {board.turnOver && <EndOfTurnOverlay />}
    </>
  );

  return ret;
};

export { CurrentTurn };
