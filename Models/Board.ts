import Column from "./Column";
import Team from "./Team";
import Turn from "./Turn";
import TurnAction from "./TurnAction";
import RendersInConsole from "./RendersInConsole";
import Color from "./Color";

class Board implements RendersInConsole {
  private _piecesPerTeam: number;
  teams: Team[];
  turn: Turn;
  columns: Column[];

  constructor() {
    this._piecesPerTeam = 15;

    this.teams = [];
    this.teams.push(new Team(Color.Black, this._piecesPerTeam, -1, 0, 6));
    this.teams.push(new Team(Color.White, this._piecesPerTeam, 1, 23, 6));

    this.turn = new Turn();

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.setStartingTurn(this.teams[0].color, this.teams[1].color);
    this.populateHomeBase();
    //this.populateColumns();
    //this.populateJail();
  }

  populateJail(): void {
    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());
    this.columns[7].addPiece(this.teams[0].home.removePiece());

    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());

    this.teams[0].jail.addPiece(this.teams[0].home.removePiece());
    this.teams[1].jail.addPiece(this.teams[1].home.removePiece());
  }

  populateHomeBase(): void {
    this.columns[23].addPiece(this.teams[1].home.removePiece());
    this.columns[23].addPiece(this.teams[1].home.removePiece());
    this.columns[23].addPiece(this.teams[1].home.removePiece());

    this.columns[22].addPiece(this.teams[1].home.removePiece());
    this.columns[22].addPiece(this.teams[1].home.removePiece());
    this.columns[22].addPiece(this.teams[1].home.removePiece());

    this.columns[21].addPiece(this.teams[1].home.removePiece());
    this.columns[21].addPiece(this.teams[1].home.removePiece());
    this.columns[21].addPiece(this.teams[1].home.removePiece());

    this.columns[20].addPiece(this.teams[1].home.removePiece());
    this.columns[20].addPiece(this.teams[1].home.removePiece());

    this.columns[19].addPiece(this.teams[1].home.removePiece());
    this.columns[19].addPiece(this.teams[1].home.removePiece());

    this.columns[18].addPiece(this.teams[1].home.removePiece());
    this.columns[18].addPiece(this.teams[1].home.removePiece());

    this.columns[0].addPiece(this.teams[0].home.removePiece());
    this.columns[0].addPiece(this.teams[0].home.removePiece());
    this.columns[0].addPiece(this.teams[0].home.removePiece());

    this.columns[1].addPiece(this.teams[0].home.removePiece());
    this.columns[1].addPiece(this.teams[0].home.removePiece());
    this.columns[1].addPiece(this.teams[0].home.removePiece());

    this.columns[2].addPiece(this.teams[0].home.removePiece());
    this.columns[2].addPiece(this.teams[0].home.removePiece());
    this.columns[2].addPiece(this.teams[0].home.removePiece());

    this.columns[3].addPiece(this.teams[0].home.removePiece());
    this.columns[3].addPiece(this.teams[0].home.removePiece());

    this.columns[4].addPiece(this.teams[0].home.removePiece());
    this.columns[4].addPiece(this.teams[0].home.removePiece());

    this.columns[5].addPiece(this.teams[0].home.removePiece());
    this.columns[5].addPiece(this.teams[0].home.removePiece());
  }

  get winner(): Team | undefined {
    return this.teams.find((team) => team.hasWon());
  }

  populateColumns(): void {
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

  get currentTeam(): Team {
    let index = this.turn.currentTeamIndex;
    if (index == null) {
      throw Error("No team set");
    }
    return this.teams[index];
  }

  get currentOpponent(): Team {
    let index = this.turn.currentOpponentIndex;
    if (index == null) {
      throw Error("No opponent set");
    }
    return this.teams[index];
  }

  renderInConsole(): string {
    let topRow = "";
    for (let i = 0; i < 6; i++) {
      topRow += `${i < 9 ? "0" : ""}${i + 1}|${this.columns[i].renderInConsole()}  `;
    }
    topRow += "| JAIL |     ";
    for (let i = 6; i < 12; i++) {
      topRow += `${i < 9 ? "0" : ""}${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let bottomRow = "";
    for (let i = 23; i > 17; i--) {
      bottomRow += `${i + 1}|${this.columns[i].renderInConsole()}  `;
    }
    bottomRow += "| JAIL |     ";
    for (let i = 17; i > 11; i--) {
      bottomRow += `${i + 1}|${this.columns[i].renderInConsole()}  `;
    }

    let board = `
                                                                       ${Color[this.currentTeam.color]}'s turn
                                                                       ${this.currentTeam.dice.renderInConsole()}

    ${this.teams[0].home.renderInConsole()} 

    ${topRow}

                                                                               ${this.teams[0].jail.renderInConsole()}
    ------------------------------------------------------------------------| JAIL |-------------------------------------------------------------------------
                                                                                ${this.teams[1].jail.renderInConsole()}

    ${bottomRow}

    ${this.teams[1].home.renderInConsole()} 
    `;

    return board;
  }

  setStartingTurn(color: Color, opponentColor: Color): void {
    //search the team array for the color, and if it's not present throw err
    let startingTeam = this.teams.findIndex((team) => team.color == color);
    let startingOpponent = this.teams.findIndex(
      (team) => team.color == opponentColor,
    );
    if (startingTeam == -1 || startingOpponent == -1) {
      throw Error("Invalid team selections\n");
    }

    this.turn.nextTurn(startingTeam, startingOpponent);
  }

  changeTurn(): void {
    //just loop through the team array.
    //this is (needlessly rn) extensibile in that it allows more teams in the future, potentially allowing a way to check for active too
    let nextTeam = this.turn.currentTeamIndex;
    let nextOpp = this.turn.currentTeamIndex;
    if (nextTeam == null) {
      throw Error("No starting team set!\n");
    } else {
      if (nextTeam == this.teams.length - 1) {
        nextTeam = 0;
      } else {
        nextTeam++;
      }
    }
    //just use the same logic for the enemy too. It's going to just trail the currentTeam basically
    if (nextOpp == null) {
      throw Error("No starting opponent set\n]");
    } else if (nextOpp == this.teams.length - 1) {
      nextOpp = 0;
    } else {
      nextOpp++;
    }

    this.turn.nextTurn(nextTeam, nextOpp);
  }

  rollDice(): void {
    this.turn.roll();
    this.currentTeam.dice.roll();
  }

  clearDice(team: string): void {
    if (team == "team") {
      this.currentTeam.dice.clearRolls();
    } else if (team == "opponent") {
      this.currentTeam.dice.clearRolls();
    } else {
      throw Error("Invalid team selection");
    }
  }

  processTurnAction(action: TurnAction): void {
    //assess the turn action for legality
    action = this.moveLegal(action);

    if (action.actionLegal) {
      let fromColumn;
      let toColumn;
      if (action.fromJail) {
        fromColumn = this.currentTeam.jail;
        toColumn = this.columns[action.to];
      } else if (action.toHome) {
        fromColumn = this.columns[action.from];
        toColumn = this.currentTeam.home;
      } else {
        fromColumn = this.columns[action.from];
        toColumn = this.columns[action.to];
      }
      //move the piece, hit if there's a piece moved
      let hitPiece = toColumn.addPiece(fromColumn.removePiece());
      if (hitPiece != undefined) {
        this.currentOpponent.jail.addPiece(hitPiece);
      }
      this.currentTeam.dice.useRoll(action.rollCost);
    } else {
      throw Error(action.errorMessage);
    }
  }

  moveLegal(turnAction: TurnAction): TurnAction {
    //going to assume you're calling this as the currentTeam

    if (turnAction.fromJail) {
      return this.jailBreakLegal(turnAction);
    } else if (turnAction.toHome) {
      return this.homeReturnLegal(turnAction);
    } else {
      return this.standardMoveLegal(turnAction);
    }
  }

  jailBreakLegal(turnAction: TurnAction): TurnAction {
    //check if there's even a piece in jail
    if (this.currentTeam.jail.empty()) {
      turnAction.cannotMove("Jail is already empty\n");
      return turnAction;
    }

    //check if the colummn they're moving to is in the enemy base
    if (!this.currentOpponent.isInHomeBase(turnAction.to)) {
      turnAction.cannotMove("Can't escape jail except into enemy base\n");
      return turnAction;
    }

    //check if they can move that far with the current rolls
    let rollDistance = this.currentOpponent.homeBaseIndex(turnAction.to) + 1;
    if (!this.currentTeam.dice.rollLegal(rollDistance)) {
      turnAction.cannotMove("Can't move that distance with current roll\n");
      return turnAction;
    }

    turnAction.canMove(rollDistance);
    return turnAction;
  }

  homeReturnLegal(turnAction: TurnAction): TurnAction {
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
    for (let i = 0; i < this.columns.length; i++) {
      if (
        this.columns[i].color == this.currentTeam.color &&
        !this.currentTeam.isInHomeBase(i)
      ) {
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
        if (this.columns[nextColumn].color == this.currentTeam.color) {
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

  standardMoveLegal(turnAction: TurnAction): TurnAction {
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

  hasLegalMovesRemaining(): boolean {
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
              let moveTo = i + roll * team.directionMultiplier;
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
