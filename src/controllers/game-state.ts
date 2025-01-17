import { Board } from "../models/board";
import { Color } from "../models/color";
import { Column } from "../models/column";
import { ID } from "../models/id";
import { Piece } from "../models/piece";
import { PieceList } from "../models/piece-list";
import { Team } from "../models/team";

function turnOver(board: Board): boolean {
  const team = currentTeam(board);
  const opp = currentOpponent(board);
  if (
    board.turn.rolled &&
    (team.dice.rolls.length == 0 ||
      legalMoveSources(board, team, opp).length == 0)
  ) {
    return true;
  } else {
    return false;
  }
}

function moveDistance(
  board: Board,
  piece: Piece,
  fromList: ID,
  toList: ID,
): number {
  //this should return the distance between 2 piece lists for a given piece
  const fromLocation = getPieceList(board, fromList);
  const toLocation = getPieceList(board, toList);
  if (!fromLocation) {
    //this means you passed in an invalid list
    throw Error(`${fromList} not found`);
  }
  if (!toLocation) {
    //this means you passed in an invalid list
    throw Error(`${toList} not found`);
  }
  if (fromLocation.legalColors.indexOf(piece.color) < 0) {
    //this shouldn't get called
    throw Error(`Distance of ${piece} from ${fromList} is undefined`);
  }
  if (fromLocation.legalColors.indexOf(piece.color) < 0) {
    //this shouldn't get called
    throw Error(`Distance of ${piece} to ${toList} is undefined`);
  }
  return (
    (toLocation.locationIndex - fromLocation.locationIndex) *
    piece.directionMultiplier
  );
}

function getPieceList(board: Board, listID: ID): PieceList | null {
  let team;
  switch (listID.type) {
    case "home":
      team = board.teams.find((team) => team.home.id.equals(listID));
      if (team) return team.home;
      else return null;
    case "jail":
      team = board.teams.find((team) => team.jail.id.equals(listID));
      if (team) return team.jail;
      else return null;
    case "column":
      const column = board.columns.find((col) => col.id.equals(listID));
      if (column) return column;
      else return null;
    default:
      return null;
  }
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
      if (piece.color == color) {
        pieceCount++;
      }
    });
  }
  return pieceCount;
}

function legalMoves(board: Board, team: Team, opp: Team, fromList: ID): ID[] {
  //return the list of locations that the player could possibly move to
  //this function is gonna be pretty logic heavy, so lots of comments
  const rolls = team.dice.rolls;
  const fromLocation = getPieceList(board, fromList);

  let legalMoves: ID[] = [];

  if (!rolls || rolls.length == 0) {
    return legalMoves; //no rolls left
  }
  //the list they're moving from has to have at least one of their pieces
  if (fromLocation && pieceCount(board, fromList, team.color) > 0) {
    const piece = fromLocation.retrieveFirstPiece(); //assumes lists only have one of a given type
    //populate the legalmoves for moves from a column
    if (fromList.type == "column") {
      //the jail can't have any of their pieces
      if (pieceCount(board, team.jail.id, team.color) == 0) {
        //for moving from a column to a column
        let readyForHome: boolean = true;
        board.columns.forEach((col: Column) => {
          //also check if any pieces are currently outside homebase
          if (
            moveDistance(board, piece, team.home.id, col.id) > team.homeBaseSize
          ) {
            readyForHome = false;
          }
          //  the difference between the columns has to be a rolldistance
          //  they can't move backward
          //  the column they move to can't have > 1 of the other team's piece
          const distance = moveDistance(board, piece, fromList, col.id);
          if (
            rolls.indexOf(distance) >= 0 &&
            pieceCount(board, col.id, opp.color) < 2
          ) {
            legalMoves.push(col.id);
          }
        });
        //for moving home
        //  they can't have any pieces outside homebase
        if (readyForHome) {
          //  the column has to be a rolldistance away from their home
          const distance = moveDistance(board, piece, fromList, team.home.id);
          if (rolls.indexOf(distance) > 0) {
            legalMoves.push(team.home.id);
          }
        }
      }
    } else if (fromList.type == "jail") {
      //populate the legalmoves for moves from jail
      //  they have to move to a column
      board.columns.forEach((col: Column) => {
        //  the location has to be a roll distance away from the jail
        //  the column they move to can't have >1 of the other team's piece
        const distance = moveDistance(board, piece, fromList, col.id);
        if (!distance) {
          throw Error("Move distance is undefined"); //this shouldn't happen, error in the move distance logic
        }
        if (
          rolls.indexOf(distance) >= 0 &&
          pieceCount(board, col.id, opp.color) <= 1
        ) {
          legalMoves.push(col.id);
        }
      });
    }
  }
  return legalMoves;
}

function legalMoveSources(board: Board, team: Team, opp: Team): ID[] {
  let legalSources: ID[] = [];
  console.log("start");
  board.columns.forEach((col) => {
    if (legalMoves(board, team, opp, col.id).length > 0)
      legalSources.push(col.id);
  });

  if (legalMoves(board, team, opp, team.jail.id).length > 0) {
    legalSources.push(team.jail.id);
  }

  return legalSources;
}

export {
  legalMoves,
  turnOver,
  getPieceList,
  currentTeam,
  currentOpponent,
  pieceCount,
  moveDistance,
  legalMoveSources,
};
