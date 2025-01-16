import { ChangeTurnButton, ResetTurnButton, UndoButton } from "./buttons";

const EndOfTurnOverlay: React.FC = () => {
  const ret = (
    <>
      <div id="change-turn-overlay" className="overlay show-overlay">
        <div id="change-turn-popup" className="popup show-popup">
          <ChangeTurnButton />
          <UndoButton />
          <ResetTurnButton />
        </div>
      </div>
    </>
  );

  return ret;
};

export { EndOfTurnOverlay };
