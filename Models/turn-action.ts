class TurnAction {
  private _from: number | string;
  private _to: number | string;
  private _actionLegal: boolean | null;
  private _errorMessage: string | null;
  private _rollCost: number | null;

  constructor(from: number | string, to: number | string) {
    //have to manually set them to something incorrect first
    //so that I can call the proper setters without compile errors for not setting _from and _to in ctor
    this._from = -1;
    this._to = -1;
    this.from = from;
    this.to = to;
    this._actionLegal = null;
    this._errorMessage = null;
    this._rollCost = null;
  }

  private validateColumnType(column: string): boolean {
    const columnTypes = ["jail", "home"];
    return columnTypes.includes(column);
  }

  get from(): number | string {
    return this._from;
  }

  set from(from: number | string) {
    if (typeof from === "string") {
      if (this.validateColumnType(from)) {
        this._from = from;
      } else {
        throw Error(`Can't set from column to ${from}`);
      }
    } else {
      this._from = from;
    }
  }

  get to(): number | string {
    return this._to;
  }

  set to(to: number | string) {
    if (typeof to === "string") {
      if (this.validateColumnType(to)) {
        this._to = to;
      } else {
        throw Error(`Can't set to column to ${to}`);
      }
    } else {
      this._to = to;
    }
  }

  get fromJail() {
    return typeof this._from == "string" && this._from == "jail";
  }

  get toHome() {
    return typeof this._to == "string" && this._to == "home";
  }

  get actionLegal(): boolean | null {
    return this._actionLegal;
  }

  get errorMessage(): string | null {
    return this._errorMessage;
  }

  get rollCost(): number | null {
    return this._rollCost;
  }

  canMove(rollCost: number): void {
    this._actionLegal = true;
    this._rollCost = rollCost;
  }

  cannotMove(errorMessage: string): void {
    this._actionLegal = false;
    this._errorMessage = errorMessage;
  }
}

export default TurnAction;
