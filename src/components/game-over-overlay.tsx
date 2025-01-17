import { useBoardStore } from "../stores/game-store";
import { EndGameButton } from "./buttons";

const GameOverOverlay: React.FC = () => {
  const winner = useBoardStore((state) => state.board.winner);
  return (
    <>
      {winner && (
        <div id="game-over-overlay" className="overlay show-overlay">
          <div id="change-over-popup" className="popup show-popup">
            <h1>{`${winner} wins!`}</h1>
            <EndGameButton />
          </div>
        </div>
      )}
    </>
  );
};

export { GameOverOverlay };
