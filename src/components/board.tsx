import { Dice } from "./dice";
import { CurrentTurn } from "./current-turn";
import { GameOverOverlay } from "./game-over-overlay";
import { Column } from "./column";
import { useBoardStore } from "../stores/game-store";
import { Home } from "./home";
import { Jail } from "./jail";

const Board: React.FC = () => {
  const board = useBoardStore((state) => state.board);
  const topLeft = [];
  for (let i = 0; i < 6; i++) {
    const column = board.columns[i];
    topLeft.push(<Column key={column.id.value} columnModel={column} />);
  }

  const topRight = [];
  for (let i = 6; i < 12; i++) {
    const column = board.columns[i];
    topRight.push(<Column key={column.id.value} columnModel={column} />);
  }

  const bottomLeft = [];
  for (let i = 18; i < 24; i++) {
    const column = board.columns[i];
    bottomLeft.push(<Column key={column.id.value} columnModel={column} />);
  }

  const bottomRight = [];
  for (let i = 12; i < 18; i++) {
    const column = board.columns[i];
    bottomRight.push(<Column key={column.id.value} columnModel={column} />);
  }

  const ret = (
    <>
      <div className="play-area">
        <CurrentTurn />
        <div className="board">
          <div className="row">
            <Home
              key={board.teams[0].home.id.value}
              home={board.teams[0].home}
            />
            <div id="top-left" className="column-group-top">
              {topLeft}
            </div>
            <Jail
              key={board.teams[1].jail.id.value}
              jail={board.teams[1].jail}
            />
            <div id="top-right" className="column-group-top">
              {topRight}
            </div>
            <div className="home empty-home"></div>
          </div>
          <div className="row">
            <div className="home none-home"></div>
            <div className="empty-space">
              <Dice />
            </div>
            <div id="none-jail" className="jail"></div>
            <div className="empty-space"></div>
            <div className="home none-home"></div>
          </div>
          <div className="row">
            <Home
              key={board.teams[1].home.id.value}
              home={board.teams[1].home}
            />
            <div id="bottom-left" className="column-group-bottom">
              {bottomLeft}
            </div>
            <Jail
              key={board.teams[0].jail.id.value}
              jail={board.teams[0].jail}
            />
            <div id="bottom-right" className="column-group-bottom">
              {bottomRight}
            </div>
            <div className="home empty-home"></div>
          </div>
        </div>
      </div>
    </>
  );

  return ret;
};

export { Board };
