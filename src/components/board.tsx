import { Dice } from "./dice";
import { CurrentTurn } from "./current-turn";
import { GameOverOverlay } from "./game-over-overlay";
import { Column } from "./column";
import { useBoardStore } from "../stores/game-store";
import { Home } from "./home";
import { Jail } from "./jail";

const Board: React.FC = () => {
  const board = useBoardStore((state) => state.board);
  const columns = [];
  for (let i = 0; i < 6; i++) {
    const column = board.columns[i];
    columns.push(<Column key={column.id.value} columnModel={column} />);
  }

  for (let i = 6; i < 12; i++) {
    const column = board.columns[i];
    columns.push(<Column key={column.id.value} columnModel={column} />);
  }

  for (let i = 18; i < 24; i++) {
    const column = board.columns[i];
    columns.push(<Column key={column.id.value} columnModel={column} />);
  }

  for (let i = 12; i < 18; i++) {
    const column = board.columns[i];
    columns.push(<Column key={column.id.value} columnModel={column} />);
  }
  const dummyCol = board.columns[0];

  const ret = (
    <>
      <div className="play-area">
        <CurrentTurn />
        <div className="board">
          <Home key={board.teams[0].home.id.value} home={board.teams[0].home} />
          {columns}
          <Jail key={board.teams[1].jail.id.value} jail={board.teams[1].jail} />
          <div className="home right-home"></div>
          <div className="home right-home center-row"></div>
          <div id="jail center-row" className="jail"></div>
          <div className="home left-home center-row"></div>
          <Home key={board.teams[1].home.id.value} home={board.teams[1].home} />
          <Jail key={board.teams[0].jail.id.value} jail={board.teams[0].jail} />
          <div className="home right-home"></div>
        </div>
      </div>
    </>
  );

  return ret;
};

export { Board };
