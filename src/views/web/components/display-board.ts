import Board from "../../../models/board";
import TurnAction from "../../../models/turn-action";
import Color from "../../../models/color";
import Dice from "../../../models/dice";

function reloadDice(dice: Dice): void {
  let rollsString;
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

function displayBoard(board: Board) {
  document.querySelector<HTMLDivElement>(".board")!.innerHTML = `
      <h2 id="dice">Dice: 5,2</h2>
      <div class="row">
        <div id="black-home" class="home black top-row piece-container"></div>
        <div id="top-left" class="column-group-top">
          <div id="0" class="column odd top-row-container">
            <div class="piece white"></div>
            <div class="piece white"></div>
          </div>
          <div id="1" class="column even top-row piece-container"></div>
          <div id="2" class="column odd top-row piece-container"></div>
          <div id="3" class="column even top-row piece-container"></div>
          <div id="4" class="column odd top-row piece-container"></div>
          <div id="5" class="column even top-row piece-container">
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
          </div>
        </div>
        <div id="white-jail" class="jail black top-row piece-container"></div>
        <div id="top-right" class="column-group-top">
          <div id="6" class="column odd top-row piece-container"></div>
          <div id="7" class="column even top-row piece-container">
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
          </div>
          <div id="8" class="column odd top-row piece-container"></div>
          <div id="9" class="column even top-row piece-container"></div>
          <div id="10" class="column odd top-row piece-container"></div>
          <div id="11" class="column even top-row piece-container">
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="white-home" class="home white white bottom-row piece-container"></div>
        <div id="bottom-left" class="column-group-bottom">
          <div id="18" class="column odd bottom-row piece-container">
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
          </div>
          <div id="19" class="column even bottom-row piece-container"></div>
          <div id="20" class="column odd bottom-row piece-container"></div>
          <div id="21" class="column even bottom-row piece-container"></div>
          <div id="22" class="column odd bottom-row piece-container"></div>
          <div id="23" class="column even bottom-row piece-container">
            <div class="piece black"></div>
            <div class="piece black"></div>
          </div>
        </div>
        <div id="black-jail" class="jail black bottom-row piece-container"></div>
        <div id="bottom-right" class="column-group-bottom">
          <div id="12" class="column odd bottom-row piece-container">
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
            <div class="piece black"></div>
          </div>
          <div id="column-13" class="column even bottom-row piece-container"></div>
          <div id="column-14" class="column odd bottom-row piece-container"></div>
          <div id="column-15" class="column even bottom-row piece-container"></div>
          <div id="column-16" class="column odd bottom-row piece-container">
            <div class="piece white"></div>
            <div class="piece white"></div>
            <div class="piece white"></div>
          </div>
          <div id="column-17" class="column even bottom-row piece-container"></div>
        </div>
    `;
}

export { displayBoard, reloadDice, declareWinner };
