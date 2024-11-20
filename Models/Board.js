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

    this.currentTeam = null;
    this.currentOpponent = null;

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
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
                                                                       ${this.currentTeam().color}'s.currentTeam().color

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
    let startingTeam = teams.findIndex((team) => (team.color = color));
    let startingOpponent = teams.findIndex(
      (team) => (team.color = opponentColor),
    );
    if (startingTeam == -1 || startingOpponent == -1) {
      throw Error("Invalid team selections\n");
    }
    this.currentTeam = startingTeam;
    this.currentOpponent = startingOpponent;
  }

  changeTurn() {
    //just loop through the team array.
    //this is (needlessly rn) extensibile in that it allows more teams in the future, potentially allowing a way to check for active too
    if (this.currentTeam == null) {
      throw Error("No starting team set!");
    } else if (this.currentTeam == this.teams.length) {
      this.currentTeam = 0;
    } else {
      this.currentTeam++;
    }
    //just use the same logic for the enemy too. It's going to just trail the currentTeam basically
    if (this.currentOpponent == null) {
      throw Error("No starting opponent set!");
    } else if (this.currentOpponent == this.teams.length) {
      this.currentOpponent = 0;
    } else {
      this.currentOpponent++;
    }
  }

  currentTeam() {
    return this.teams[currentTeam];
  }

  currentOpponent() {
    return this.teams[currentOpponent];
  }

  jailBreak(columnNum) {
    //going to assume you're calling this as the currentTeam
    let currentTeam = this.currentTeam();
    let currentOpp = this.currentOpponent();

    let inmate = currentTeam.jail.getFirstPiece();

    //check if there's even a piece in jail
    if (currentTeam.jail.empty()) {
      throw Error("Jail is already empty\n");
    }

    //check if the colummn they're moving to is in their home
    if (!currentOpp.isInStartBase(columnNum)) {
      throw Error("Can't escape jail except into enemy base\n");
    }

    //check if there's a space at the given column
    //if so, remove the piece from jail and put it in the column
    let toColStatus = this.spaceAvailable(columnNum);

    if (toColStatus == 0) {
      throw Error("Can't move to a column full of the other team\n");
    } else {
      if (toColStatus == -1) {
        //hit
        otherJail.addPiece(toCol.removePiece());
      }
      //move
      //this is where you could log the move if you wanted an undo feature
      toCol.addPiece(selfJail.removePiece());
      currentPlayer.dice.useRoll(
        Math.abs(columnNum - currentOpp.homeBaseStart) + 1,
      );
    }
  }

  goHome(columnNum) {
    //going to assume you're calling this as the currentTeam
    //basically just check if the team has any pieces outside their base
    //if they don't and there's a piece at that col, move the piece home
    let currentTeam = this.currentTeam();

    if (!currentTeam.isInStartBase(columnNum)) {
      throw new Error("Can only move home from your start base\n");
    } else {
      //make sure there's a piece there
      if (this.columns[from].length === 0) {
        throw Error("Can't move a piece from empty column\n");
      }

      //make sure the piece is the right color
      let piece = this.columns[from].getFirstPiece();
      if (piece.color != currentTeam.color) {
        throw Error("Can't move the other team's piece\n");
      }

      //can't move with a piece in jail
      if (!currentTeam.jail.empty()) {
        throw Error("Can't move with a piece in jail\n");
      }

      const distance = Math.abs(columnNum - baseStartColumn);
      //make sure the distance is available
      if (!currentTeam.dice.rollLegal(distance)) {
        throw Error("Can't move that distance with current roll\n");
      }
      currentTeam.dice.useRoll(distance);
      currentTeam.home.addPiece(piece);
    }
  }

  spaceAvailable(columnNum) {
    //going to assume you're calling this as the currentTeam
    //0 is no
    //1 is yes
    //-1 is it has the other team, but you can hit
    //is the column currently full of the other team?
    let col = this.columns[columnNum];
    if (!col.empty() && col.getColor() != currentTeam().color) {
      //can we hit?
      if (!col.canHit()) {
        //no we can't
        return 0;
      } else {
        return -1;
      }
    } else {
      //col is empty or has your team in it, therefore safe
      return 1;
    }
  }

  movePiece(fromIndex, toIndex) {
    //going to assume you're calling this as the currentTeam
    let fromCol = this.columns[from];
    let toCol = this.columns[toIndex];

    let currentTeam = this.currentTeam();
    let currentOpp = this.currentOpponent();

    //make sure there's a piece there
    let piece;
    try {
      piece = this.columns[fromIndex].getFirstPiece();
    } catch (err) {
      throw Error("can't move piece from empty column\n");
    }

    //make sure the piece is the right color
    if (piece.color != currentTeam.color()) {
      throw Error("Can't move the other team's piece\n");
    }

    //can't move with a piece in jail
    if (!currentTeam.jail.empty()) {
      throw Error("Can't move with a piece in jail\n");
    }

    //make sure it's moving the right way
    if (currentTeam.directionMultiplier * (toCol - fromCol) < 0) {
      throw Error("Can't move backward\n");
    }

    const distance = Math.abs(fromIndex - toIndex);
    //make sure the distance is available
    if (!currentTeam.dice.rollLegal(distance)) {
      throw Error("Can't move that distance with current rolls\n");
    }

    //check if there's a space at the given column
    //if so, remove the piece from jail and put it in the column
    let toColStatus = this.spaceAvailable(columnNum);

    if (toColStatus == 0) {
      throw Error("Can't move to a column full of the other team\n");
    } else {
      if (toColStatus == -1) {
        //hit
        currentOpp.jail.addPiece(toCol.removePiece());
      }
      //move
      //this is where you could log the move if you wanted an undo feature
      toCol.addPiece(fromCol.removePiece());
      currentTeam.dice.useRoll(distance);
    }
  }
}

export default Board;
