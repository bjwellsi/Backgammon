import { Dice } from "./dice";
import { CurrentTurn } from "./current-turn";
import { Column } from "./column";
import { useBoardStore } from "../stores/game-store";

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
            <div id="black-home" className="home black piece-container"></div>
            <div id="top-left" className="column-group-top">
              {topLeft}
            </div>
            <div id="white-jail" className="jail black piece-container"></div>
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
            <div id="white-home" className="home white piece-container"></div>
            <div id="bottom-left" className="column-group-bottom">
              {bottomLeft}
            </div>
            <div id="black-jail" className="jail black piece-container"></div>
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
