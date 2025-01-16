import {
  EndGameButton,
  ResetTurnButton,
  RollDiceButton,
  UndoButton,
} from "./buttons";

const ControlRow: React.FC = () => {
  const ret = (
    <>
      <div className="control-row">
        <RollDiceButton />
        <UndoButton />
        <ResetTurnButton />
        <EndGameButton />
      </div>
    </>
  );

  return ret;
};

export { ControlRow };
