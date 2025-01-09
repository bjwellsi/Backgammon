import { TurnAction } from "../models/turn-action";
import { useUIStore } from "../stores/ui-store";
import { movePiece } from "./game-engine";

function selectPieceList(listID: string) {
  const action = useUIStore.getState().action;
  if (!action.from) {
    let newAction = action.clone();
    newAction.from = listID;
    useUIStore.setState({ action: newAction });
  } else {
    let newAction = action.clone();
    newAction.to = listID;
    useUIStore.setState({ action: new TurnAction(null, null) });

    movePiece(newAction);
  }
}

export { selectPieceList };
