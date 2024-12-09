import Column from "./Column.js";
import Jail from "./Jail.js";
import Home from "./Home.js";
import Dice from "./Dice.js";
import Team from "./Team.js";
import TurnAction from "./TurnAction.js";

class Board {
  constructor() {
    this.piecesPerTeam = 15;

    this.teams = [];
    this.teams.push(new Team("black", this.piecesPerTeam, -1, 0, 6));
    this.teams.push(new Team("white", this.piecesPerTeam, 1, 23, 6));

    this.currentTeamIndex = null;
    this.currentOpponentIndex = null;

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
  }

  winner() {
    return this.teams.find((team) => team.hasWon());
  }

  populateColumns() {
    //just braking this out for readability and potentially extensibility
    this.columns[0].addPiece(this.teams[1].home.removePiece());
    this.columns[0].addPiece(this.teams[1].home.removePiece());

    this.columns[11].addPiece(this.teams[1].home.removePiece());
    this.columns[11].addPiece(this.teams[1].home.removePiece());
    this.columns[11].addPiece(this.teams[1].home.removePiece());
    this.columns[11].addPiece(this.teams[1].home.removePiece());
    this.columns[11].addPiece(this.teams[1].home.removePiece());

    this.columns[16].addPiece(this.teams[1].home.removePiece());
    this.columns[16].addPiece(this.teams[1].home.removePiece());
    this.columns[16].addPiece(this.teams[1].home.removePiece());

    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());

    this.columns[23].addPiece(this.teams[0].home.removePiece());
    this.columns[23].addPiece(this.teams[0].home.removePiece());

    this.columns[12].addPiece(this.teams[0].home.removePiece());
    this.columns[12].addPiece(this.teams[0].home.removePiece());
    this.columns[12].addPiece(this.teams[0].home.removePiece());
    this.columns[12].addPiece(this.teams[0].home.removePiece());
    this.columns[12].addPiece(this.teams[0].home.removePiece());

    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());

    this.columns[5].addPiece(this.teams[0].home.removePiece());
    this.columns[5].addPiece(this.teams[0].home.removePiece());
    this.columns[5].addPiece(this.teams[0].home.removePiece());
    this.columns[5].addPiece(this.teams[0].home.removePiece());
    this.columns[5].addPiece(this.teams[0].home.removePiece());
  }

  renderInConsole() {
    let topRow = "";
    for (let i = 0; i < 12; i++) {
      topRow += `${i < 9 ? "0" : ""}${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let bottomRow = "";
    for (let i = 23; i > 11; i--) {
      bottomRow += `${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let board = `
                                                                       ${this.currentTeam().color}'s turn
                                                                       ${this.currentTeam().dice.renderInConsole()}

    ${this.teams[0].home.renderInConsole()} 

    ${topRow}

                                                                       ${this.teams[0].jail.renderInConsole()}
    -------------------------------------------------------------------JAIL----------------------------------------------------------------------------
                                                                       ${this.teams[1].jail.renderInConsole()}

    ${bottomRow}

    ${this.teams[1].home.renderInConsole()} 
    `;

    return board;
  }

  setStartingTurn(color, opponentColor) {
    //search the team array for the color, and if it's not present throw err
    let startingTeam = this.teams.findIndex((team) => team.color == color);
    let startingOpponent = this.teams.findIndex(
      (team) => team.color == opponentColor,
    );
    if (startingTeam == -1 || startingOpponent == -1) {
      throw Error("Invalid team selections\n");
    }
    this.currentTeamIndex = startingTeam;
    this.currentOpponentIndex = startingOpponent;
  }

  changeTurn() {
    //just loop through the team array.
    //this is (needlessly rn) extensibile in that it allows more teams in the future, potentially allowing a way to check for active too
    if (this.currentTeamIndex == null) {
      throw Error("No starting team set!\n");
    } else {
      this.currentTeam().dice.clearRolls();
      if (this.currentTeamIndex == this.teams.length - 1) {
        this.currentTeamIndex = 0;
      } else {
        this.currentTeamIndex++;
      }
    }
    //just use the same logic for the enemy too. It's going to just trail the currentTeam basically
    if (this.currentOpponentIndex == null) {
      throw Error("No starting opponent set\n]");
    } else if (this.currentOpponentIndex == this.teams.length - 1) {
      this.currentOpponentIndex = 0;
    } else {
      this.currentOpponentIndex++;
    }
  }

  currentTeam() {
    return this.teams[this.currentTeamIndex];
  }

  currentOpponent() {
    return this.teams[this.currentOpponentIndex];
  }

  transferPiece(fromColumn, toColumn) {
    if (!toColumn.approvedForMove(fromColumn.getFirstPiece())) {
      throw new Error("Can't move here\n");
    } else {
      //move the piece, hit if there's a piece moved
      let hitPiece = toColumn.addPiece(fromColumn.removePiece());
      if (hitPiece != undefined) {
        this.currentOpponent().jail.addPiece(hitPiece);
      }
    }
  }

  processTurnAction(action) {
    //once I build move legal, I could likely just combine all the roll actions into
    //moveLegal?
    //  then move the piece, remove the roll
    //no?
    //  then throw the error that you got back from move legal

    //parse out the turnAction
    if (action.fromJail()) {
      this.jailBreak(action.to);
    } else if (action.toHome()) {
      this.goHome(action.from);
    } else {
      this.movePiece(action.from, action.to);
    }
  }

  moveLegal(turnAction) {
    //figure out return type and how you're going to call this.
    //would like to return a message if the roll isn't legal, but also have some simple way to indicate it is
    //could be a pair, with bool and message?
    //need to return the roll that needs to be removed, so that we can do so outside this message

    //also todo is allow legal moves in home for rolls where the index is empty but the greater index isn't

    //going to assume you're calling this as the currentTeam
    let currentTeam = this.currentTeam();
    let currentOpp = this.currentOpponent();

    if (turnAction.fromJail()) {
      //jail only logic

      //check if there's even a piece in jail
      if (currentTeam.jail.empty()) {
        throw Error("Jail is already empty\n");
      }

      //check if the colummn they're moving to is in the enemy base
      if (!currentOpp.isInHomeBase(turnAction.to)) {
        throw Error("Can't escape jail except into enemy base\n");
      }

      //check if they can move that far with the current rolls
      let rollDistance = currentOpp.homeBaseIndex(turnAction.to) + 1;
      if (!currentTeam.dice.rollLegal(rollDistance)) {
        throw Error("Can't move that distance with current roll\n");
      }
    } else {
      //shared home and standard logic

      //make sure there's a piece there
      if (this.columns[turnAction.from].empty()) {
        throw Error("Can't move a piece from empty column\n");
      }

      //make sure the piece is the right color
      let piece = this.columns[turnAction.from].getFirstPiece();
      if (piece.color != currentTeam.color) {
        throw Error("Can't move the other team's piece\n");
      }

      //can't move with a piece in jail
      if (!currentTeam.jail.empty()) {
        throw Error("Can't move with a piece in jail\n");
      }

      if (turnAction.tohome()) {
        //home only logic

        //basically just check if the team has any pieces outside their base
        //if they don't and there's a piece at that col, move the piece home

        if (!currentTeam.isInHomeBase(turnAction.from)) {
          throw new Error("Can only move home from your start base\n");
        }

        //todo, check if the index being attempted is the largest available index < than one of the rolls
        //for this logic, you'd say either the roll matches an index exactly (easy case)
        //or all home indexes > than one of the rolls are empty
        //return which roll should be removed.

        const distance = currentTeam.homeBaseIndex(turnAction.from);
        //make sure the distance is available
        if (!currentTeam.dice.rollLegal(distance)) {
          throw Error("Can't move that distance with current roll\n");
        }
      } else {
        //standard move logic

        //make sure it's moving the right way
        const distanceVertex =
          currentTeam.directionMultiplier * (turnAction.to - turnAction.from);
        if (distanceVertex < 0) {
          throw Error("Can't move backward\n");
        }

        //make sure the distance is available
        const distance = Math.abs(distanceVertex);
        if (!currentTeam.dice.rollLegal(distance)) {
          throw Error("Can't move that distance with current rolls\n");
        }
      }
    }
  }

  hasLegalMovesRemaining() {
    //this method is really complex, but I don't see a way to simplify it without needlessly breaking it into smaller methods
    //that only serve to increase the amount of jumping around in method definitions you have to do.
    //it also is a lot of logic to have to run between every move, but i also don't see a way to simplify that
    //other than running some sort of indexing, like on currently populated columns for ex.
    //the problem with that is it would increase the complexity of the codebase, and the likelihood of errors around unsynced data
    let team = this.currentTeam();
    let opponent = this.currentOpponent();
    let columns = this.columns;
    let rolls = team.dice.rolls;
    if (!team.jail.empty()) {
      //check if any of the enemy base indexes that match the current rolls are empty
      let piece = team.jail.getFirstPiece();
      rolls.forEach((roll) => {
        let column = columns[opponent.homeBaseIndexToColumnNum(roll)];
        if (column.approvedForMove(piece)) {
          return true;
        }
      });
      return false;
    } else {
      //check if there's a player outside the home base
      let readyForHome = true;
      for (let i = 0; i < columns.length; i++) {
        if (!team.isInHomeBase(i)) {
          readyForHome = false;
        }
      }
      if (readyForHome) {
        //the only way you couldn't move in this case is if
        //you don't have a piece on the column you rolled,
        //and the pieces you do have are > col indexes than your roll,
        //and where they can move to is occupied by an enemy tower
        let largerColsPopulated = false;
        rolls.forEach((roll) => {
          let rollColumn = team.homeBaseIndexToColumnNum(roll);
          if (columns[rollColumn].getColor() == team.getColor()) {
            return true;
          } else {
            //you don't have a piece on the column, you have to move from a higher one if populated
            //so loop through the home base, checking if column - the roll is a legal column to move to (if populated)
            //this is where it gets tricky. Because if there isn't a column that's populated above this column, you can move
            //if there isn't, you can't
            //so you have to keep track of whether there's a populated column > than the roll, and if there isn't then you can move
            //if there is, AND that column doesn't have a valid destination, you can't
            let nextColumn = team.homeBaseIndexToColumnNum(
              team.homeBaseIndex(rollColumn) + 1,
            );
            while (nextColumn != -1) {
              if (columns[nextColumn].getColor() == team.getColor()) {
                largerColsPopulated = true;
                if (
                  columns[
                    nextColumn + roll * team.directionMultiplier
                  ].getColor() == team.getColor()
                ) {
                  return true;
                }
              }
              nextColumn = team.homeBaseIndexToColumnNum(
                team.homeBaseIndex(nextColumn) + 1,
              );
            }
          }
        });
        if (!largerColsPopulated) {
          //now that you've checked every roll, if you have a true largerColsPopulated, but you couldn't move to one of the smaller cols, you can't move
          return true;
        }
        return false;
      } else {
        //typical case, there's nobody in jail but there are pieces outside home base
        //have to check each roll against each populated column, see if the column it could move to would be a legal move
        rolls.forEach((roll) => {
          for (let i = 0; i < columns.length; i++) {
            if (columns[i].getColor() == team.color) {
              //only check populated columns for this team
              let toIndex = i + roll * team.directionMultiplier;
              if (
                columns[toIndex].approvedForMove(columns[i].getFirstPiece())
              ) {
                //you've got a column you can move to
                //so just return true, there's a legal move
                return true;
              }
            }
          }
        });
        //if you make it out of here without once returning true, you've got no legal moves
        return false;
      }
    }
  }

  jailBreak(columnNum) {
    //going to assume you're calling this as the currentTeam
    let currentTeam = this.currentTeam();
    let currentOpp = this.currentOpponent();

    //check if there's even a piece in jail
    if (currentTeam.jail.empty()) {
      throw Error("Jail is already empty\n");
    }

    //check if the colummn they're moving to is in the enemy base
    if (!currentOpp.isInHomeBase(columnNum)) {
      throw Error("Can't escape jail except into enemy base\n");
    }

    //check if they can move that far with the current rolls
    let rollDistance = currentOpp.homeBaseIndex(columnNum) + 1;
    if (!currentTeam.dice.rollLegal(rollDistance)) {
      throw Error("Can't move that distance with current roll\n");
    }

    this.transferPiece(currentTeam.jail, this.columns[columnNum]);
    currentTeam.dice.useRoll(rollDistance);
  }

  goHome(columnNum) {
    //going to assume you're calling this as the currentTeam
    //basically just check if the team has any pieces outside their base
    //if they don't and there's a piece at that col, move the piece home
    let currentTeam = this.currentTeam();

    if (!currentTeam.isInHomeBase(columnNum)) {
      throw new Error("Can only move home from your start base\n");
    }
    //make sure there's a piece there
    if (this.columns[columnNum].empty()) {
      throw Error("Can't move a piece from empty column\n");
    }

    //make sure the piece is the right color
    let piece = this.columns[columnNum].getFirstPiece();
    if (piece.color != currentTeam.color) {
      throw Error("Can't move the other team's piece\n");
    }

    //can't move with a piece in jail
    if (!currentTeam.jail.empty()) {
      throw Error("Can't move with a piece in jail\n");
    }

    const distance = currentTeam.homeBaseIndex(columnNum);
    //make sure the distance is available
    if (!currentTeam.dice.rollLegal(distance)) {
      throw Error("Can't move that distance with current roll\n");
    }

    this.transferPiece(currentTeam.jail, this.columns[columnNum]);
    currentTeam.dice.useRoll(distance);
  }

  movePiece(fromIndex, toIndex) {
    //going to assume you're calling this as the currentTeam

    let currentTeam = this.currentTeam();

    //make sure there's a piece there
    if (this.columns[fromIndex].empty()) {
      throw Error("Can't move a piece from empty column\n");
    }
    let piece = this.columns[fromIndex].getFirstPiece();

    //make sure the piece is the right color
    if (piece.color != currentTeam.color) {
      throw Error("Can't move the other team's piece\n");
    }

    //can't move with a piece in jail
    if (!currentTeam.jail.empty()) {
      throw Error("Can't move with a piece in jail\n");
    }

    //make sure it's moving the right way
    if (currentTeam.directionMultiplier * (toIndex - fromIndex) < 0) {
      throw Error("Can't move backward\n");
    }

    //make sure the distance is available
    const distance = Math.abs(fromIndex - toIndex);
    if (!currentTeam.dice.rollLegal(distance)) {
      throw Error("Can't move that distance with current rolls\n");
    }

    this.transferPiece(this.columns[fromIndex], this.columns[toIndex]);
    currentTeam.dice.useRoll(distance);
  }
}

export default Board;
