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

    this._currentTeamIndex = null;
    this._currentOpponentIndex = null;

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
  }

  get winner() {
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

  get currentTeam() {
    return this.teams[this._currentTeamIndex];
  }

  get currentOpponent() {
    return this.teams[this._currentOpponentIndex];
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
                                                                       ${this.currentTeam.color}'s turn
                                                                       ${this.currentTeam.dice.renderInConsole()}

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
    this._currentTeamIndex = startingTeam;
    this._currentOpponentIndex = startingOpponent;
  }

  changeTurn() {
    //just loop through the team array.
    //this is (needlessly rn) extensibile in that it allows more teams in the future, potentially allowing a way to check for active too
    if (this._currentTeamIndex == null) {
      throw Error("No starting team set!\n");
    } else {
      if (this._currentTeamIndex == this.teams.length - 1) {
        this._currentTeamIndex = 0;
      } else {
        this._currentTeamIndex++;
      }
    }
    //just use the same logic for the enemy too. It's going to just trail the currentTeam basically
    if (this._currentOpponentIndex == null) {
      throw Error("No starting opponent set\n]");
    } else if (this._currentOpponentIndex == this.teams.length - 1) {
      this._currentOpponentIndex = 0;
    } else {
      this._currentOpponentIndex++;
    }
  }

  transferPiece(fromColumn, toColumn) {
    if (!toColumn.approvedForMove(fromColumn.retrieveFirstPiece())) {
      throw new Error("Can't move here\n");
    } else {
      //move the piece, hit if there's a piece moved
      let hitPiece = toColumn.addPiece(fromColumn.removePiece());
      if (hitPiece != undefined) {
        this.currentOpponent.jail.addPiece(hitPiece);
      }
    }
  }

  processTurnAction(action) {
    //assess the turn action for legality
    action = this.moveLegal(action);

    if (action.moveLegal) {
      this.transferPiece(action.from, action.to);
      this.currentTeam.dice.useRoll(action.rollCost);
    } else {
      throw Error(action.errorMessage);
    }
  }

  moveLegal(turnAction) {
    //going to assume you're calling this as the currentTeam

    if (turnAction.fromJail) {
      return this.jailBreakLegal(turnAction);
    } else if (turnAction.toHome) {
      return this.homeReturnLegal(turnAction);
    } else {
      return this.standardMoveLegal(turnAction);
    }
  }

  jailBreakLegal(turnAction) {
    //check if there's even a piece in jail
    if (this.currentTeam.jail.empty()) {
      turnAction.cannotMove("Jail is already empty\n");
      return turnAction;
    }

    //check if the colummn they're moving to is in the enemy base
    if (!currentOpp.isInHomeBase(turnAction.to)) {
      turnAction.cannotMove("Can't escape jail except into enemy base\n");
      return turnAction;
    }

    //check if they can move that far with the current rolls
    let rollDistance = currentOpp.homeBaseIndex(turnAction.to) + 1;
    if (!this.currentTeam.dice.rollLegal(rollDistance)) {
      turnAction.cannotMove("Can't move that distance with current roll\n");
      return turnAction;
    }

    turnAction.canMove(rollDistance);
    return turnAction;
  }

  homeReturnLegal(turnAction) {
    //make sure there's a piece there
    if (this.columns[turnAction.from].empty()) {
      turnAction.cannotMove("Can't move a piece from empty column\n");
      return turnAction;
    }

    //make sure the piece is the right color
    let piece = this.columns[turnAction.from].retrieveFirstPiece();
    if (piece.color != this.currentTeam.color) {
      turnAction.cannotMove("Can't move the other team's piece\n");
      return turnAction;
    }

    //can't move with a piece in jail
    if (!this.currentTeam.jail.empty()) {
      turnAction.cannotMove("Can't move with a piece in jail\n");
      return turnAction;
    }

    //check if there's a player outside the home base
    let readyForHome = true;
    for (let i = 0; i < columns.length; i++) {
      if (!this.currentTeam.isInHomeBase(i)) {
        readyForHome = false;
      }
    }
    if (!readyForHome) {
      turnAction.cannotMove(
        "Can't move home with pieces outside of home base\n",
      );
      return turnAction;
    }

    //confirm piece is in home base. Redundant check based on other logic but doing to be explicit
    let fromHomeIndex = this.currentTeam.homeBaseIndex(turnAction.from);
    if (fromHomeIndex < 0) {
      turnAction.cannotMove("Can't move home from outside home base\n");
      return turnAction;
    }

    //confirm the move is in the dice
    //if the column matches a roll exactly, you're good
    if (this.currentTeam.dice.rollLegal(fromHomeIndex + 1)) {
      //you're allowed to move
      turnAction.canMove(fromHomeIndex + 1);
      return turnAction;
    } else {
      //if it doesn't match a roll exactly, first check if there's a roll that's > than this index
      if (this.currentTeam.dice.maxRoll() < fromHomeIndex + 1) {
        turnAction.cannotMove(
          "Can't move from a larger column than your highest roll\n",
        );
        return turnAction;
      }
      //now check if there are any columns that are larger than this index that are populated
      let nextHomeIndex =
        this.currentTeam.incrementHomeBaseIndex(fromHomeIndex);
      let nextColumn = this.currentTeam.homeBaseIndexToColumnNum(nextHomeIndex);
      while (nextHomeIndex >= 0) {
        if (columns[nextColumn].color == this.currentTeam.color) {
          turnAction.cannotMove(
            "Can't move from a column that doesn't match a dice roll while larger columns are populated\n",
          );
          return turnAction;
        }
        nextHomeIndex = this.currentTeam.incrementHomeBaseIndex(nextHomeIndex);
      }
      //you're allowed to move
      //return the max roll
      turnAction.canMove(this.currentTeam.dice.maxRoll());
      return turnAction;
    }
  }

  standardMoveLegal(turnAction) {
    //make sure there's a piece there
    if (this.columns[turnAction.from].empty()) {
      turnAction.cannotMove("Can't move a piece from empty column\n");
      return turnAction;
    }

    //make sure the piece is the right color
    let piece = this.columns[turnAction.from].retrieveFirstPiece();
    if (piece.color != this.currentTeam.color) {
      turnAction.cannotMove("Can't move the other team's piece\n");
      return turnAction;
    }

    //can't move with a piece in jail
    if (!this.currentTeam.jail.empty()) {
      turnAction.cannotMove("Can't move with a piece in jail\n");
      return turnAction;
    }

    //make sure it's moving the right way
    const distanceVertex =
      this.currentTeam.directionMultiplier * (turnAction.to - turnAction.from);
    if (distanceVertex < 0) {
      turnAction.cannotMove("Can't move backward\n");
      return turnAction;
    }

    //make sure the distance is available
    const distance = Math.abs(distanceVertex);
    if (!this.currentTeam.dice.rollLegal(distance)) {
      turnAction.cannotMove("Can't move that distance with current rolls\n");
      return turnAction;
    }
    //you're allowed to move
    turnAction.canMove(distance);
    return turnAction;
  }

  hasLegalMovesRemaining() {
    let team = this.currentTeam;
    let opponent = this.currentOpponent;
    let columns = this.columns;
    let rolls = team.dice.rolls;
    let color = team.color;
    if (!team.jail.empty()) {
      //check if any of the enemy base indexes that match the current rolls are legal moves
      for (let roll of rolls) {
        let columnIndex = opponent.homeBaseIndexToColumnNum(roll);
        if (this.moveLegal(new TurnAction("jail", columnIndex))) {
          return true;
        }
      }
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
        //you just have to check every index in this case, since home moves have special privileges
        let homeIndex = team.minHomeBaseIndex();
        while (homeIndex != -1) {
          let colIndex = team.homeBaseIndexToColumnNum(homeIndex);
          if (columns[colIndex].color == color) {
            let action = new TurnAction(colIndex, "home");
            if (this.moveLegal(action)) {
              return true;
            }
          }
          team.incrementHomeBaseIndex(homeIndex);
        }
        return false;
      } else {
        //typical case, there's nobody in jail but there are pieces outside home base
        //have to check each roll against each populated column, see if the column it could move to would be a legal move
        for (let roll of rolls) {
          for (let i = 0; i < columns.length; i++) {
            if (columns[i].color == color) {
              let moveTo = i + roll * team.directionMulitplier;
              let action = new TurnAction(i, moveTo);
              if (this.moveLegal(action)) {
                return true;
              }
            }
          }
        }
        return false;
      }
    }
  }
}

export default Board;
