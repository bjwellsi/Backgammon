import { ID } from "../models/id";
import { PieceList } from "../models/piece-list";
import { Team } from "../models/team";
import { useBoardStore } from "../stores/game-store";

function movePiece(fromList: ID, toList: ID): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  const options = legalMoves(fromList);
  if (options.indexOf(toList) == -1) {
    throw Error("Can't move there");
  } else {
    console.log("todo");
    //move the piece from fromlist to tolist
    //if there's an enemy piece in toList, move it to the enmy jail
  }
  useBoardStore.setState({ board: board });
}

function rollDice(): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  board.turn.roll();
  currentTeam().dice.roll();
  useBoardStore.setState({ board: board });
}

function clearDice(team: string): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  if (team == "team") {
    currentTeam().dice.clearRolls();
  } else if (team == "opponent") {
    currentOpponent().dice.clearRolls();
  } else {
    throw Error("Invalid team selection");
  }
  useBoardStore.setState({ board: board });
}

function currentTeam(): Team {
  const board = useBoardStore.getState().board;
  const index = board.turn.currentTeamIndex;
  if (index == null) {
    throw Error("No team set");
  }
  return board.teams[index];
}

function currentOpponent(): Team {
  const board = useBoardStore.getState().board;
  const index = board.turn.currentOpponentIndex;
  if (index == null) {
    throw Error("No opponent set");
  }
  return board.teams[index];
}

function turnOver(): boolean {
  const board = useBoardStore.getState().board;
  if (board.turn.rolled && currentTeam().dice.rolls.length == 0) {
    return true;
  } else {
    return false;
  }
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

  board.turn.nextTurn(nextTeam, nextOpp);
  useBoardStore.setState({ board: board });
}

function legalMoves(fromLocation: ID): ID[] {
  //return the list of locations that the player could possibly move to
  console.log("todo");
  const fromList = getPieceList(fromLocation);
  const rolls = currentTeam().dice.rolls;
  let legalMoves: ID[] = [];
  if (fromList) {
    if (fromList.id.type == "column") {
      //populate the legalmoves for moves from a column
      //rules:
      //the column they're moving from has to have at least one of their pieces
      //the jail can't have any of their pieces
      //if they're moving from a column to a column
      //  the difference between the columns has to be a rolldistance
      //  the column they move to can't have > 1 of the other team's piece
      //  they can't move backward
      //if they're moving home
      //  they can't have any pieces outside homebase
      //  the column has to be a rolldistance away from their home
    } else if (fromList.id.type == "jail") {
      //populate the legalmoves for moves from jail
      //rules:
      //if they're moving from jail
      //  the jail has to actually have one of their pieces
      //  they can only move to a location in the home base of the enemy team
      //  the location has to be a roll distance away from the enemy home
      //  they have to move to a column
      //  the column they move to can't have >1 of the other team's piece
    }
  }
  return legalMoves;
}

function getPieceList(listID: ID): PieceList | null {
  const board = useBoardStore.getState().board;
  let team;
  switch (listID.type) {
    case "home":
      team = board.teams.find((team) => team.home.id.value == listID.value);
      if (team) return team.home;
      else return null;
    case "jail":
      team = board.teams.find((team) => team.jail.id.value == listID.value);
      if (team) return team.jail;
      else return null;
    case "column":
      const column = board.columns.find((col) => col.id.value == listID.value);
      if (column) return column;
      else return null;
    default:
      return null;
  }
}

export { rollDice, nextTurn, movePiece };
