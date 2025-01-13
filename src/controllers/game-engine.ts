import { Board } from "../models/board";
import { Color } from "../models/color";
import { Column } from "../models/column";
import { ID } from "../models/id";
import { Piece } from "../models/piece";
import { PieceList } from "../models/piece-list";
import { Team } from "../models/team";
import { useBoardStore } from "../stores/game-store";

function moveDistance(
  board: Board,
  team: Team,
  fromList: ID,
  toList: ID,
): number {
  console.log("todo");
  //this should return the distance to 2 columns, given the team passed in. that way a move can be directionally legal based on its result
  //it should also be able to return the distance of a column from the home base, based on home base size
  return 0;
}

function currentTeam(board: Board): Team {
  const index = board.turn.currentTeamIndex;
  if (index == null) {
    throw Error("No team set");
  }
  return board.teams[index];
}

function currentOpponent(board: Board): Team {
  const index = board.turn.currentOpponentIndex;
  if (index == null) {
    throw Error("No opponent set");
  }
  return board.teams[index];
}

function pieceCount(board: Board, pieceList: ID, color: Color): number {
  let pieceCount = 0;
  const list = getPieceList(board, pieceList);
  if (list) {
    list.pieces.forEach((piece: Piece) => {
      if (piece.color != color) {
        pieceCount++;
      }
    });
  }
  return pieceCount;
}

function movePiece(fromList: ID, toList: ID): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  const options = legalMoves(fromList);
  if (options.indexOf(toList) == -1) {
    throw Error("Can't move there");
  } else {
    console.log("todo");
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
    //move the piece from fromlist to tolist
    toLocation.addPiece(fromLocation.removePiece());
    //remove the roll from the teams available rolls
    const team = currentTeam(board);
    team.dice.useRoll(moveDistance(board, team, fromList, toList));
  }
  useBoardStore.setState({ board: board });
}

function rollDice(): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  board.turn.roll();
  currentTeam(board).dice.roll();
  useBoardStore.setState({ board: board });
}

function clearDice(): void {
  const oldBoard = useBoardStore.getState().board;
  const board = oldBoard.clone();
  board.teams.forEach((team: Team) => {
    team.dice.clearRolls();
  });
  useBoardStore.setState({ board: board });
}

function turnOver(board: Board): boolean {
  if (board.turn.rolled && currentTeam(board).dice.rolls.length == 0) {
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

function legalMoves(fromList: ID): ID[] {
  //return the list of locations that the player could possibly move to
  //this function is gonna be pretty logic heavy, so lots of comments
  const board = useBoardStore.getState().board;
  const fromLocation = getPieceList(board, fromList);
  const team = currentTeam(board);
  const opp = currentOpponent(board);
  const rolls = team.dice.rolls;

  let legalMoves: ID[] = [];

  if (!rolls || rolls.length == 0) {
    return legalMoves; //no rolls left
  }
  //the list they're moving from has to have at least one of their pieces
  if (fromList && pieceCount(board, fromList, team.color) > 0) {
    //populate the legalmoves for moves from a column
    if (fromList.type == "column") {
      //the jail can't have any of their pieces
      if (pieceCount(board, team.jail.id, team.color) == 0) {
        //for moving from a column to a column
        let readyForHome: boolean = true;
        board.columns.forEach((col: Column) => {
          //also check if any pieces are currently outside homebase
          if (
            moveDistance(board, team, team.home.id, col.id) > team.homeBaseSize
          ) {
            readyForHome = false;
          }
          //  the difference between the columns has to be a rolldistance
          //  they can't move backward
          //  the column they move to can't have > 1 of the other team's piece
          const distance = moveDistance(board, team, fromList, col.id);
          if (
            rolls.indexOf(distance) > 0 &&
            pieceCount(board, col.id, opp.color) < 2
          ) {
            legalMoves.push(col.id);
          }
        });
        //for moving home
        //  they can't have any pieces outside homebase
        if (readyForHome) {
          //  the column has to be a rolldistance away from their home
          const distance = moveDistance(board, team, fromList, team.home.id);
          if (rolls.indexOf(distance) > 0) {
            legalMoves.push(team.home.id);
          }
        }
      }
    } else if (fromList.type == "jail") {
      //populate the legalmoves for moves from jail
      //  they have to move to a column
      board.columns.forEach((col: Column) => {
        //  the column they move to can't have >1 of the other team's piece
        if (pieceCount(board, col.id, opp.color) <= 1) {
          legalMoves.push(col.id);
        }
        //  the location has to be a roll distance away from the jail. Jail starts at enemy home for distance calculations
        const distance = moveDistance(board, team, fromList, col.id);
        if (!distance) {
          throw Error("Move distance is undefined"); //this shouldn't happen, error in the move distance logic
        }
        if (rolls.indexOf(distance) > 0) {
          legalMoves.push(col.id);
        }
      });
    }
  }
  return legalMoves;
}

function getPieceList(board: Board, listID: ID): PieceList | null {
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
