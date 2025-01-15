import { ID } from "../models/id";
import { useUIStore } from "../stores/ui-store";
import { movePiece } from "./game-engine";

function selectPieceList(listID: ID) {
  const fromList = useUIStore.getState().fromList;
  if (!fromList) {
    let newFromList = new ID(listID.type, listID.value);
    useUIStore.setState({ fromList: newFromList });
  } else {
    useUIStore.setState({ fromList: null });

    movePiece(fromList, listID);
  }
}

export { selectPieceList };
