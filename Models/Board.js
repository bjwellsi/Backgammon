import Column from "./Column.js";
import Jail from "./Jail.js";
import Home from "./Home.js";
import Dice from "./Dice.js";
import Team from "./Team.js";

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
