import { currentTeam, turnOver } from "../controllers/game-state";
import { Color } from "../models/color";
import { useBoardStore } from "../stores/game-store";
import { EndOfTurnOverlay } from "./end-of-turn-overlay";

const CurrentTurn: React.FC = () => {
  const board = useBoardStore((state) => state.board);
  const ret = (
    <>
      <h2 id="turn">{Color[currentTeam(board).color]}'s turn</h2>
      {turnOver(board) && <EndOfTurnOverlay />}
    </>
  );

  return ret;
};

export { CurrentTurn };
