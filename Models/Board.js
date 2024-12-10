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

    this.setStartingTurn("black", "white");
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
    //assess the turn action for legality
    action = this.moveLegal(action);

    if (action.getMoveLegal()) {
      this.transferPiece(action.getFrom(), action.getTo());
      currentTeam.dice.useRoll(action.getRollCost());
    } else {
      throw Error(action.getErrorMessage());
    }
  }

  moveLegal(turnAction) {
    //going to assume you're calling this as the currentTeam
    let currentTeam = this.currentTeam();
    let currentOpp = this.currentOpponent();

    if (turnAction.getFromJail()) {
      return this.jailBreakLegal(turnAction);
    } else if (turnAction.getToHome()) {
      return this.homeReturnLegal(turnAction);
    } else {
      return this.standardMoveLegal(turnAction);
    }
  }

  jailBreakLegal(turnAction) {
    //check if there's even a piece in jail
    if (currentTeam.jail.empty()) {
      turnAction.cannotMove("Jail is already empty\n");
      return turnAction;
    }

    //check if the colummn they're moving to is in the enemy base
    if (!currentOpp.isInHomeBase(turnAction.getTo())) {
      turnAction.cannotMove("Can't escape jail except into enemy base\n");
      return turnAction;
    }

    //check if they can move that far with the current rolls
    let rollDistance = currentOpp.homeBaseIndex(turnAction.getTo()) + 1;
    if (!currentTeam.dice.rollLegal(rollDistance)) {
      turnAction.cannotMove("Can't move that distance with current roll\n");
      return turnAction;
    }

    turnAction.canMove(rollDistance);
    return turnAction;
  }

  homeReturnLegal(turnAction) {
    //make sure there's a piece there
    if (this.columns[turnAction.getFrom()].empty()) {
      turnAction.cannotMove("Can't move a piece from empty column\n");
      return turnAction;
    }

    //make sure the piece is the right color
    let piece = this.columns[turnAction.getFrom()].getFirstPiece();
    if (piece.color != currentTeam.color) {
      turnAction.cannotMove("Can't move the other team's piece\n");
      return turnAction;
    }

    //can't move with a piece in jail
    if (!currentTeam.jail.empty()) {
      turnAction.cannotMove("Can't move with a piece in jail\n");
      return turnAction;
    }

    //check if there's a player outside the home base
    let readyForHome = true;
    for (let i = 0; i < columns.length; i++) {
      if (!currentTeam.isInHomeBase(i)) {
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
    let fromHomeIndex = currentTeam.homeBaseIndex(turnAction.getFrom());
    if (fromHomeIndex < 0) {
      turnAction.cannotMove("Can't move home from outside home base\n");
      return turnAction;
    }

    //confirm the move is in the dice
    //if the column matches a roll exactly, you're good
    if (currentTeam.dice.rollLegal(fromHomeIndex + 1)) {
      //you're allowed to move
      turnAction.canMove(fromHomeIndex + 1);
      return turnAction;
    } else {
      //if it doesn't match a roll exactly, first check if there's a roll that's > than this index
      if (currentTeam.dice.maxRoll() < fromHomeIndex + 1) {
        turnAction.cannotMove(
          "Can't move from a larger column than your highest roll\n",
        );
        return turnAction;
      }
      //now check if there are any columns that are larger than this index that are populated
      let nextHomeIndex = currentTeam.incrementHomeBaseIndex(fromHomeIndex);
      let nextColumn = currentTeam.homeBaseIndexToColumnNum(nextHomeIndex);
      while (nextHomeIndex >= 0) {
        if (columns[nextColumn].getColor() == currentTeam.getColor()) {
          turnAction.cannotMove(
            "Can't move from a column that doesn't match a dice roll while larger columns are populated\n",
          );
          return turnAction;
        }
        nextHomeIndex = currentTeam.incrementHomeBaseIndex(nextHomeIndex);
      }
      //you're allowed to move
      //return the max roll
      turnAction.canMove(currentTeam.dice.maxRoll());
      return turnAction;
    }
  }

  standardMoveLegal(turnAction) {
    //make sure there's a piece there
    if (this.columns[turnAction.getFrom()].empty()) {
      turnAction.cannotMove("Can't move a piece from empty column\n");
      return turnAction;
    }

    //make sure the piece is the right color
    let piece = this.columns[turnAction.getFrom()].getFirstPiece();
    if (piece.color != currentTeam.color) {
      turnAction.cannotMove("Can't move the other team's piece\n");
      return turnAction;
    }

    //can't move with a piece in jail
    if (!currentTeam.jail.empty()) {
      turnAction.cannotMove("Can't move with a piece in jail\n");
      return turnAction;
    }

    //make sure it's moving the right way
    const distanceVertex =
      currentTeam.directionMultiplier *
      (turnAction.getTo() - turnAction.getFrom());
    if (distanceVertex < 0) {
      turnAction.cannotMove("Can't move backward\n");
      return turnAction;
    }

    //make sure the distance is available
    const distance = Math.abs(distanceVertex);
    if (!currentTeam.dice.rollLegal(distance)) {
      turnAction.cannotMove("Can't move that distance with current rolls\n");
      return turnAction;
    }
    //you're allowed to move
    turnAction.canMove(distance);
    return turnAction;
  }

  hasLegalMovesRemaining() {
    //new plan

    //this method is really complex, but I don't see a way to simplify it without needlessly breaking it into smaller methods
    //that only serve to increase the amount of jumping around in method definitions you have to do.
    //it also is a lot of logic to have to run between every move, but i also don't see a way to simplify that
    //other than running some sort of indexing, like on currently populated columns for ex.
    //the problem with that is it would increase the complexity of the codebase, and the likelihood of errors around unsynced data
    //
    //
    //the other way to handle this class would be to just call moveLegal for all possible populated columns. That might be much easier from a maintenance perspective
    //but at least slightly more complex from a runtime perspective.
    //the downside of this current strategy is that it means that the logic needs to be maintained in two places.
    //the upside is really that you just save a few allocations and method calls per index you check.
    //honestly maybe that's not a huge deal.
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
      let readyforhome = true;
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
}

export default Board;
