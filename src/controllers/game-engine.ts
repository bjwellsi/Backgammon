import { Board } from "../models/board";
import { ID } from "../models/id";
import { Team } from "../models/team";
import { useBoardStore } from "../stores/game-store";
import {
  legalMoves,
  currentTeam,
  currentOpponent,
  getPieceList,
  pieceCount,
  moveDistance,
} from "./game-state";
import {
  autoSave,
  lastMoveSave,
  loadAutoSave,
  loadManualSave,
  manualSave,
  saveTurnStart,
} from "./saves";

function initializeBoard(): void {
  //technically this will initialize the board with an autosave if it exists,
  //let it just load on its own if it doesn't
  console.log("todo");

  loadAutoSave();
}

function endGame(): void {
  const board = new Board();
  useBoardStore.setState({ board: board });
  autoSave();
  lastMoveSave();
  saveTurnStart();
}

function movePiece(fromList: ID, toList: ID): void {
  lastMoveSave();
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  const options = legalMoves(
    board,
    currentTeam(board),
    currentOpponent(board),
    fromList,
  );
  //try getting the roll for the legal move. If there isn't a value, then the move isn't legal
  const roll = options.get(toList.value);
  if (!roll) {
    throw Error("Can't move there");
  } else {
    const fromLocation = getPieceList(board, fromList);
    const toLocation = getPieceList(board, toList);
    if (!fromLocation || !toLocation) {
      throw Error("Move locations are invalid"); //this should never happen. The legalmoves function has an error
    }
    const opp = currentOpponent(board);
    if (pieceCount(board, toList, opp.color) == 1) {
      const enemyJail = opp.jail;
      //if there's an enemy piece in toList, move it to the enemy jail
      enemyJail.pieces.push(toLocation.removePiece()); //this assumes columns can only have one category of pieces
    }
    const pieceToMove = fromLocation.removePiece();
    const team = currentTeam(board);
    try {
      //remove the roll from the teams available rolls
      team.dice.useRoll(roll);
    } catch (err) {
      toLocation.addPiece(pieceToMove);
      throw err;
    }
    //move the piece from fromlist to tolist
    toLocation.addPiece(pieceToMove);
  }
  useBoardStore.setState({ board: board });
  autoSave();
}

function rollDice(): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  board.turn.roll();
  currentTeam(board).dice.roll();
  useBoardStore.setState({ board: board });
  autoSave();
  saveTurnStart();
  lastMoveSave();
}

function nextTurn(): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  //just loop through the team array.
  //this is (needlessly rn) extensibile in that it allows more teams in the future, potentially allowing a way to check for active too
  let nextTeam = board.turn.currentTeamIndex;
  let nextOpp = board.turn.currentOpponentIndex;
  if (nextTeam == null) {
    throw Error("No starting team set!");
  } else {
    if (nextTeam == board.teams.length - 1) {
      nextTeam = 0;
    } else {
      nextTeam++;
    }
  }
  //just use the same logic for the enemy too. It's going to just trail the currentTeam basically
  if (nextOpp == null) {
    throw Error("No starting opponent set]");
  } else if (nextOpp == board.teams.length - 1) {
    nextOpp = 0;
  } else {
    nextOpp++;
  }

  //clear the dice
  board.teams.forEach((team: Team) => {
    team.dice.clearRolls();
  });
  board.turn.nextTurn(nextTeam, nextOpp);
  useBoardStore.setState({ board: board });
  autoSave();
  saveTurnStart();
  lastMoveSave();
}

export { initializeBoard, endGame, rollDice, nextTurn, movePiece };
