import { currentTeam, turnOver } from "../controllers/game-state";
import { Color } from "../models/color";
import { useBoardStore } from "../stores/game-store";
import { EndOfTurnOverlay } from "./end-of-turn-overlay";
import { GameOverOverlay } from "./game-over-overlay";

const CurrentTurn: React.FC = () => {
  const board = useBoardStore((state) => state.board);
  const ret = (
    <>
      <h2 id="turn">{Color[currentTeam(board).color]}'s turn</h2>
      {!board.winner && turnOver(board) && <EndOfTurnOverlay />}
      {board.winner && <GameOverOverlay />}
    </>
  );

  return ret;
};

export { CurrentTurn };
