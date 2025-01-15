import cloneDeep from "lodash/cloneDeep";
import { ID } from "./id";

class TurnAction {
  from: ID | null;
  to: ID | null;
  private _actionLegal: boolean | null;
  private _errorMessage: string | null;
  private _rollCost: number | null;

  constructor(from: ID, to: ID) {
    this.from = from;
    this.to = to;
    this._actionLegal = null;
    this._errorMessage = null;
    this._rollCost = null;
  }

  clone(): TurnAction {
    return cloneDeep(this);
  }

  get fromJail() {
    console.log("todo");
    return false;
  }

  get toHome() {
    console.log("todo");
    return false;
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

export { TurnAction };
