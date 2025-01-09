import { Color } from "../models/color";
import { useBoardStore } from "../stores/game-store";
import { EndOfTurnOverlay } from "./end-of-turn-overlay";

const CurrentTurn: React.FC = () => {
  const board = useBoardStore((state) => state.board);
  const ret = (
    <>
      <h2 id="turn">{Color[board.currentTeam.color]}'s turn</h2>
      {board.turnOver && <EndOfTurnOverlay />}
    </>
  );

  return ret;
};

export { CurrentTurn };
