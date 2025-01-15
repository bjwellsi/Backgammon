import { currentTeam } from "../controllers/game-engine";
import { useBoardStore } from "../stores/game-store";

const Dice: React.FC = () => {
  const dice = useBoardStore((state) => currentTeam(state.board).dice);
  const rolls = dice.rolls;
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
