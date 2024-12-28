import Color from "../models/color";
import { populateCommands } from "./command-events";
import Piece from "../models/piece";
import { getBoard } from "../controllers/board-provider";
import { populateSaveFunctions } from "./display-save-options";
import { ReactElement, ReactNode } from "react";

function displayDice(): ReactElement | null {
  let board = getBoard();
  let dice = board.currentTeam.dice;
  let rollsString = "";
  let rolls = dice.rolls;
  if (rolls.length > 0) {
    rollsString = rolls.join(", ");
    return (
      <>
        <h3>{rollsString}</h3>
      </>
    );
  } else {
    return null;
  }
}

function displayTurnStatus(): void {
  let board = getBoard();
  if (board.turnOver) {
    showPopup("change-turn");
  } else {
    hidePopup("change-turn");
  }
}

function populatePieces(): void {
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

function hidePopup(popupIdPrefix: string): void {
  let popup = document.getElementById(`${popupIdPrefix}-popup`);
  let overlay = document.getElementById(`${popupIdPrefix}-overlay`);
  if (popup && overlay) {
    popup.classList.remove("show-popup");
    overlay.classList.remove("show-overlay");
  }
}

function showPopup(popupIdPrefix: string): void {
  let popup = document.getElementById(`${popupIdPrefix}-popup`);
  let overlay = document.getElementById(`${popupIdPrefix}-overlay`);
  if (popup && overlay) {
    popup.classList.add("show-popup");
    overlay.classList.add("show-overlay");
  }
}

const createColumn = (columnIndex: number, inverted: boolean): ReactNode => {
  let id = `column-${columnIndex}`;

  let oddOrEven = "odd";
  if (columnIndex % 2 > 0) {
    oddOrEven = "even";
  }
  let topOrBottom = "bottom";
  if (inverted) {
    topOrBottom = "top";
  }

  return (
    <>
      <div
        key={id}
        id={id}
        className={`column piece-contaier ${oddOrEven} ${topOrBottom}`}
      >
        <div
          key="piece-list"
          className={`piece-list piece-contaier ${oddOrEven} ${topOrBottom}`}
        ></div>
        <div
          key="triangle"
          className={`triangle piece-contaier ${oddOrEven} ${topOrBottom}`}
        ></div>
      </div>
    </>
  );
};

const DisplayBoard: React.FC = () => {
  let board = getBoard();

  let topLeft = [];
  for (let i = 0; i < 6; i++) {
    topLeft.push(createColumn(i, true));
  }

  let topRight = [];
  for (let i = 6; i < 12; i++) {
    topRight.push(createColumn(i, true));
  }

  let bottomLeft = [];
  for (let i = 18; i < 24; i++) {
    bottomLeft.push(createColumn(i, false));
  }

  let bottomRight = [];
  for (let i = 12; i < 18; i++) {
    bottomRight.push(createColumn(i, false));
  }

  let ret = (
    <>
      <div className="play-area">
        <h2 id="turn">{Color[board.currentTeam.color]}'s turn</h2>
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
              <div id="dice">{displayDice()}</div>
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

  populatePieces();
  displayDice();
  populateSaveFunctions();
  populateCommands();
  displayTurnStatus();
  return ret;
};

export { DisplayBoard, showPopup, hidePopup };
