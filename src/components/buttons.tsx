import { endGame, nextTurn, rollDice } from "../controllers/game-engine";
import {
  loadAutoSave,
  loadManualSave,
  manualSave,
  resetTurn,
  undoLastMove,
} from "../controllers/saves";

const RollDiceButton: React.FC = () => {
  return (
    <>
      <button id="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </>
  );
};

const ChangeTurnButton: React.FC = () => {
  return (
    <>
      <button id="change-turn" onClick={nextTurn}>
        Change Turn
      </button>
    </>
  );
};

const UndoButton: React.FC = () => {
  return (
    <>
      <button id="undo" onClick={undoLastMove}>
        Undo
      </button>
    </>
  );
};

const ResetTurnButton: React.FC = () => {
  return (
    <>
      <button id="reset-turn" onClick={resetTurn}>
        Reset Turn
      </button>
    </>
  );
};

const EndGameButton: React.FC = () => {
  return (
    <>
      <button id="end-game" onClick={endGame}>
        End Game
      </button>
    </>
  );
};

const SaveButton: React.FC = () => {
  return (
    <>
      <button id="save" onClick={manualSave}>
        Save Game
      </button>
    </>
  );
};

const LoadButton: React.FC = () => {
  return (
    <>
      <button id="load" onClick={loadManualSave}>
        Load Game
      </button>
    </>
  );
};

export {
  RollDiceButton,
  ChangeTurnButton,
  ResetTurnButton,
  EndGameButton,
  SaveButton,
  LoadButton,
  UndoButton,
};
