import { Color } from "../models/color";
import { Piece } from "../models/piece";
import { getBoard } from "../controllers/board-provider";
import { Dice } from "./dice";
import { CurrentTurn } from "./current-turn";
import { Column } from "./column";

function populatePieces(): void {
  //todo
  let board = getBoard();
  let populateContainer = (pieces: Piece[], container: HTMLElement | null) => {
    for (let piece of pieces) {
      let pieceDisplay = document.createElement("div");
      pieceDisplay.classList.add("piece");
      pieceDisplay.classList.add(Color[piece.color].toLowerCase());
      container?.appendChild(pieceDisplay);
    }
  };

  for (let i = 0; i < board.columns.length; i++) {
    let containerDiv = document
      .getElementById(`column-${i}`)
      ?.querySelector<HTMLDivElement>(".piece-list");
    if (containerDiv) {
      populateContainer(board.columns[i].pieces, containerDiv);
    }
  }

  for (let i = 0; i < board.teams.length; i++) {
    let jail = board.teams[i].jail;
    let home = board.teams[i].home;
    let containerDiv = document.getElementById(
      Color[jail.color].toLowerCase() + "-jail",
    );
    populateContainer(jail.pieces, containerDiv);

    containerDiv = document.getElementById(
      Color[jail.color].toLowerCase() + "-home",
    );
    populateContainer(home.pieces, containerDiv);
  }
}

const Board: React.FC = () => {
  let topLeft = [];
  for (let i = 0; i < 6; i++) {
    topLeft.push(<Column columnIndex={i} />);
  }

  let topRight = [];
  for (let i = 6; i < 12; i++) {
    topRight.push(<Column columnIndex={i} />);
  }

  let bottomLeft = [];
  for (let i = 18; i < 24; i++) {
    bottomLeft.push(<Column columnIndex={i} />);
  }

  let bottomRight = [];
  for (let i = 12; i < 18; i++) {
    bottomRight.push(<Column columnIndex={i} />);
  }

  let ret = (
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
