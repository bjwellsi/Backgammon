import { Jail } from "./Jail.js";
import { Column } from "./Column.js";
import { Piece } from "./Piece.js";
import { Home } from "./Home.js";

class Board {
  constructor() {
    this.piecesPerTeam = 15;

    this.blackHome = new Home("black", piecesPerTeam);
    this.whiteHome = new Home("white", piecesPerTeam);

    this.jail = new Jail("black");
    this.jail = new Jail("white");

    this.columns = [];
    for (let i = 0; i < 24; i++) {
      columns.push(new Column());
    }

    populateColumns();
  }

  populateColumns() {
    //just braking this out for readability and potentially extensibility
    columns[0].push(whiteHome.pop());
    columns[0].push(whiteHome.pop());

    columns[11].push(whiteHome.pop());
    columns[11].push(whiteHome.pop());
    columns[11].push(whiteHome.pop());
    columns[11].push(whiteHome.pop());
    columns[11].push(whiteHome.pop());

    columns[16].push(whiteHome.pop());
    columns[16].push(whiteHome.pop());
    columns[16].push(whiteHome.pop());

    columns[18].push(whiteHome.pop());
    columns[18].push(whiteHome.pop());
    columns[18].push(whiteHome.pop());
    columns[18].push(whiteHome.pop());
    columns[18].push(whiteHome.pop());

    columns[23].push(blackHome.pop());
    columns[23].push(blackHome.pop());

    columns[12].push(blackHome.pop());
    columns[12].push(blackHome.pop());
    columns[12].push(blackHome.pop());
    columns[12].push(blackHome.pop());
    columns[12].push(blackHome.pop());

    columns[7].push(blackHome.pop());
    columns[7].push(blackHome.pop());
    columns[7].push(blackHome.pop());

    columns[5].push(blackHome.pop());
    columns[5].push(blackHome.pop());
    columns[5].push(blackHome.pop());
    columns[5].push(blackHome.pop());
    columns[5].push(blackHome.pop());
  }
}

export default Board;
