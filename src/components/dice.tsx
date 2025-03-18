import { currentTeam } from "../controllers/game-state";
import { useBoardStore } from "../stores/game-store";

const Dice: React.FC = () => {
  const dice = useBoardStore((state) => currentTeam(state.board).dice);
  const rolls = dice.rolls;
  let ret = <></>;
  let rollsString = "";

  const gridRow = 2;
  const gridColumn = 11;
  if (rolls.length > 0) {
    rollsString = rolls.join(", ");
    ret = (
      <>
        <div id="dice" style={{ gridRow: gridRow, gridColumn: gridColumn }}>
          <h3>{rollsString}</h3>
        </div>
      </>
    );
  }

  return ret;
};

export { Dice };
