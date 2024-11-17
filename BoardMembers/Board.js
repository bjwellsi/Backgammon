import Jail from "./Jail.js";
import Column from "./Column.js";
import Piece from "./Piece.js";
import Home from "./Home.js";

class Board {
  constructor() {
    this.piecesPerTeam = 15;

    this.blackHome = new Home("black", this.piecesPerTeam);
    this.whiteHome = new Home("white", this.piecesPerTeam);

    this.jail = new Jail("black");
    this.jail = new Jail("white");

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      this.columns.push(new Column());
    }

    this.populateColumns();
  }

  populateColumns() {
    //just braking this out for readability and potentially extensibility
    this.columns[0].addPiece(this.whiteHome.removePiece());
    this.columns[0].addPiece(this.whiteHome.removePiece());

    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());
    this.columns[11].addPiece(this.whiteHome.removePiece());

    this.columns[16].addPiece(this.whiteHome.removePiece());
    this.columns[16].addPiece(this.whiteHome.removePiece());
    this.columns[16].addPiece(this.whiteHome.removePiece());

    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());
    this.columns[18].addPiece(this.whiteHome.removePiece());

    this.columns[23].addPiece(this.blackHome.removePiece());
    this.columns[23].addPiece(this.blackHome.removePiece());

    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());
    this.columns[12].addPiece(this.blackHome.removePiece());

    this.columns[7].addPiece(this.blackHome.removePiece());
    this.columns[7].addPiece(this.blackHome.removePiece());
    this.columns[7].addPiece(this.blackHome.removePiece());

    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
    this.columns[5].addPiece(this.blackHome.removePiece());
  }
}

export default Board;
