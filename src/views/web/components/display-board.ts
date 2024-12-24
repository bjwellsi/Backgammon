import Color from "../../../models/color";
import { populateCommands } from "./command-events";
import Piece from "../../../models/piece";
import { clearError } from "./handle-error";
import { getBoard } from "../../../controllers/board-provider";
import { populateSaveFunctions } from "./display-save-options";

function displayDice(): void {
  let board = getBoard();
  let diceDiv = document.getElementById("dice");
  if (diceDiv) {
    diceDiv.id = "dice";
    let dice = board.currentTeam.dice;
    let rollsString = "";
    let rolls = dice.rolls;
    if (rolls.length > 0) {
      rollsString = rolls.join(", ");
    }

    let diceHeader = document.createElement("h3");
    diceHeader.textContent = rollsString;
    diceDiv.appendChild(diceHeader);
  }
}

function declareWinner(winner: string): void {
  let banner = document.createElement("h1");
  banner.textContent = winner + " wins!";
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

function createColumn(columnIndex: number, inverted: boolean): HTMLDivElement {
  let col = document.createElement("div");
  col.classList.add("column", "piece-container");
  col.id = `column-${columnIndex}`;

  let oddOrEven = "odd";
  if (columnIndex % 2 > 0) {
    oddOrEven = "even";
  }
  let topOrBottom = "bottom";
  if (inverted) {
    topOrBottom = "top";
  }

  //now add the actual piece row
  let pieces = document.createElement("div");
  pieces.classList.add("piece-list");
  pieces.classList.add(oddOrEven, topOrBottom);
  col.appendChild(pieces);

  let triangle = document.createElement("div");
  triangle.classList.add("triangle");
  triangle.classList.add(oddOrEven, topOrBottom);
  col.appendChild(triangle);

  col.classList.add(oddOrEven, topOrBottom);

  return col;
}

function displayBoard(): void {
  let board = getBoard();
  document.querySelector<HTMLDivElement>(".play-area")!.innerHTML = `
      <h2 id="turn">${Color[board.currentTeam.color]}'s turn</h2>
      <div id="dice"></div>
    <h3 id="error-display"></h3>
      <div class="board">
      <div class="row">
        <div id="black-home" class="home black piece-container"></div>
        <div id="top-left" class="column-group-top"></div>
        <div id="white-jail" class="jail black piece-container"></div>
        <div id="top-right" class="column-group-top"></div>
      </div>
      <div class="row">
        <div id="white-home" class="home white piece-container"></div>
        <div id="bottom-left" class="column-group-bottom"></div>
        <div id="black-jail" class="jail black piece-container"></div>
        <div id="bottom-right" class="column-group-bottom"></div>
     </div> 
    `;

  let topLeft = document.getElementById("top-left");
  if (topLeft) {
    for (let i = 0; i < 6; i++) {
      topLeft.appendChild(createColumn(i, true));
    }
  }
  let topRight = document.getElementById("top-right");
  if (topRight) {
    for (let i = 6; i < 12; i++) {
      topRight.appendChild(createColumn(i, true));
    }
  }
  let bottomLeft = document.getElementById("bottom-left");
  if (bottomLeft) {
    for (let i = 18; i < 24; i++) {
      bottomLeft.appendChild(createColumn(i, false));
    }
  }

  let bottomRight = document.getElementById("bottom-right");
  if (bottomRight) {
    for (let i = 12; i < 18; i++) {
      bottomRight.appendChild(createColumn(i, false));
    }
  }

  populatePieces();
  displayDice();
  populateSaveFunctions();
  populateCommands();
  clearError();
}

export { displayBoard, declareWinner };
