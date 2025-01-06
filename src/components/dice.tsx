import { useBoard } from "../controllers/board-provider";

const Dice: React.FC = () => {
  const { board } = useBoard();
  const rolls = board.currentTeam.dice.rolls;
  let ret = <></>;
  let rollsString = "";

  if (rolls.length > 0) {
    rollsString = rolls.join(", ");
    ret = (
      <>
        <div id="dice">
          <h3>{rollsString}</h3>
        </div>
      </>
    );
  }

  return ret;
};

export { Dice };
