import Board from "../../../models/board";
import Color from "../../../models/color";
import Dice from "../../../models/dice";
import { populateCommands } from "./command-events";
import Piece from "../../../models/piece";
import { displaySaves } from "./display-save-options";
import { clearError } from "./handle-error";

function reloadDice(dice: Dice): void {
  let rollsString: string;
  let rolls = dice.rolls;
  if (rolls.length == 0) {
    rollsString = "No rolls remaining";
  } else {
    rollsString = "Dice: " + rolls.join(", ");
  }

  let diceHeader = document.getElementById("dice");
  if (diceHeader) {
    diceHeader.textContent = rollsString;
  } else {
    throw Error("Dice not found\n");
  }
}

function declareWinner(winner: string): void {
  let banner = document.createElement("h1");
  banner.textContent = winner + " wins!";
}

function populatePieces(board: Board): void {
  let populateContainer = (pieces: Piece[], container: HTMLElement | null) => {
    for (let piece of pieces) {
      let pieceDisplay = document.createElement("div");
      pieceDisplay.classList.add("piece");
      pieceDisplay.classList.add(Color[piece.color].toLowerCase());
      container?.appendChild(pieceDisplay);
    }
  };

  for (let i = 0; i < board.columns.length; i++) {
    let containerDiv = document.getElementById(`column-${i}`);
    populateContainer(board.columns[i].pieces, containerDiv);
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

function displayBoard(board: Board) {
  document.querySelector<HTMLDivElement>(".play-area")!.innerHTML = `
      <h2 id="turn">${Color[board.currentTeam.color]}'s turn</h2>
      <h3 id="dice">${board.currentTeam.dice.renderInConsole()}</h3>
    <h3 id="error-display"></h3>
      <div class="board">
      <div class="row">
        <div id="black-home" class="home black top-row piece-container"></div>
        <div id="top-left" class="column-group-top">
          <div id="column-0" class="column odd top-row piece-container"></div>
          <div id="column-1" class="column even top-row piece-container"></div>
          <div id="column-2" class="column odd top-row piece-container"></div>
          <div id="column-3" class="column even top-row piece-container"></div>
          <div id="column-4" class="column odd top-row piece-container"></div>
          <div id="column-5" class="column even top-row piece-container"></div>
        </div>
        <div id="white-jail" class="jail black top-row piece-container"></div>
        <div id="top-right" class="column-group-top">
          <div id="column-6" class="column odd top-row piece-container"></div>
          <div id="column-7" class="column even top-row piece-container"></div>
          <div id="column-8" class="column odd top-row piece-container"></div>
          <div id="column-9" class="column even top-row piece-container"></div>
          <div id="column-10" class="column odd top-row piece-container"></div>
          <div id="column-11" class="column even top-row piece-container"></div>
        </div>
      </div>
      <div class="row">
        <div id="white-home" class="home white white bottom-row piece-container"></div>
        <div id="bottom-left" class="column-group-bottom">
          <div id="column-18" class="column odd bottom-row piece-container"></div>
          <div id="column-19" class="column even bottom-row piece-container"></div>
          <div id="column-20" class="column odd bottom-row piece-container"></div>
          <div id="column-21" class="column even bottom-row piece-container"></div>
          <div id="column-22" class="column odd bottom-row piece-container"></div>
          <div id="column-23" class="column even bottom-row piece-container"></div>
        </div>
        <div id="black-jail" class="jail black bottom-row piece-container"></div>
        <div id="bottom-right" class="column-group-bottom">
          <div id="column-12" class="column odd bottom-row piece-container"></div>
          <div id="column-13" class="column even bottom-row piece-container"></div>
          <div id="column-14" class="column odd bottom-row piece-container"></div>
          <div id="column-15" class="column even bottom-row piece-container"></div>
          <div id="column-16" class="column odd bottom-row piece-container"></div>
          <div id="column-17" class="column even bottom-row piece-container"></div>
        </div>
     </div> 
    `;

  populatePieces(board);
  displaySaves();
  populateCommands();
  clearError();
}

export { displayBoard, reloadDice, declareWinner };
