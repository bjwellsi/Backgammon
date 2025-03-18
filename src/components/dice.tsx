import { currentTeam } from "../controllers/game-state";
import { useBoardStore } from "../stores/game-store";

const Dice: React.FC = () => {
  const dice = useBoardStore((state) => currentTeam(state.board).dice);
  const rolls = dice.rolls;
  let ret = <></>;
  let rollsString = "";

  const gridRow = 2;
  let gridColumn = 3 + Math.floor(Math.random() * 12);
  if (gridColumn > 8) gridColumn += 1; //don't land it in jail

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
