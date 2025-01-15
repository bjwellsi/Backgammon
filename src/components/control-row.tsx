import {
  EndGameButton,
  LoadButton,
  ResetTurnButton,
  RollDiceButton,
  SaveButton,
} from "./buttons";

const ControlRow: React.FC = () => {
  const ret = (
    <>
      <div className="control-row">
        <RollDiceButton />
        <ResetTurnButton />
        <EndGameButton />
        <SaveButton />
        <LoadButton />
      </div>
    </>
  );

  return ret;
};

export { ControlRow };
