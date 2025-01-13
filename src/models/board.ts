import cloneDeep from "lodash/cloneDeep";
import { Column } from "./column";
import { Team } from "./team";
import { Turn } from "./turn";
import { TurnAction } from "./turn-action";
import { Color } from "./color";
import { Type } from "class-transformer";
import { ID } from "./id";

class Board {
  _piecesPerTeam: number;
  @Type(() => Team)
  teams: Team[];
  @Type(() => Turn)
  turn: Turn;
  @Type(() => Column)
  columns: Column[];

  constructor(init?: Partial<Board>) {
    this._piecesPerTeam = init?._piecesPerTeam ?? 15; // Default to 15 if not provided
    this.teams = init?.teams ?? [];
    this.turn = init?.turn ?? new Turn();
    let columnIndex = 0;
    this.columns =
      init?.columns ??
      Array(24)
        .fill(null)
        .map(() => {
          return new Column(columnIndex++);
        });

    if (!init) {
      this.teams.push(
        new Team(Color.Black, this._piecesPerTeam, -1, 6, -1, 24),
      );
      this.teams.push(new Team(Color.White, this._piecesPerTeam, 1, 6, 24, -1));
      this.setStartingTurn(this.teams[0].color, this.teams[1].color);
      this.populateColumns();
    }
  }

  clone(): Board {
    return cloneDeep(this);
  }

  get winner(): string | undefined {
    const winner = this.teams.find((team) => team.hasWon());
    if (typeof winner != "undefined") {
      return Color[winner.color];
    }
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

  setStartingTurn(color: Color, opponentColor: Color): void {
    //search the team array for the color, and if it's not present throw err
    const startingTeam = this.teams.findIndex((team) => team.color == color);
    const startingOpponent = this.teams.findIndex(
      (team) => team.color == opponentColor,
    );
    if (startingTeam == -1 || startingOpponent == -1) {
      throw Error("Invalid team selections");
    }

    this.turn.nextTurn(startingTeam, startingOpponent);
  }
}

export { Board };
