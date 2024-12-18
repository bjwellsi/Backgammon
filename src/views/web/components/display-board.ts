import Board from "../../../models/board";
import TurnAction from "../../../models/turn-action";
import Color from "../../../models/color";
import Dice from "../../../models/dice";

function pieceMoved(board: Board, turnAction: TurnAction): void {
  //just move the piece from from column to to column
  let source;
  let destination;
  let color = Color[board.currentTeam.color];
  if (turnAction.fromJail) {
    source = document.getElementById(`${color}-jail`);
  } else {
    source = document.getElementById(`column-${turnAction.from}`);
  }

  if (turnAction.toHome) {
    destination = document.getElementById(`${color}-home`);
  } else {
    destination = document.getElementById(`column-${turnAction.to}`);
  }

  //now remove from source, move to destination
  if (source == null || destination == null) {
    throw Error("Invalid source or destination\n");
  } else {
    let piece = source.querySelector(".piece");
    if (piece) {
      piece.remove();
      destination.append(piece);
    } else {
      throw Error("No piece at from column\n");
    }
  }
}

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

export { pieceMoved, reloadDice, declareWinner };
