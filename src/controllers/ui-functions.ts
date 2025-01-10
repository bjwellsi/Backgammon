import { ID } from "../models/id";
import { useUIStore } from "../stores/ui-store";
import { movePiece } from "./game-engine";

function selectPieceList(listID: ID) {
  //make this just use ids. TurnActions are outdated
  console.log("todo");
  const fromList = useUIStore.getState().fromList;
  if (!fromList) {
    let newFromList = new ID(listID.type, listID.value);
    useUIStore.setState({ fromList: newFromList });
  } else {
    const from = new ID(fromList.type, fromList.value);
    const to = listID;
    useUIStore.setState({ fromList: null });

    movePiece(fromList, listID);
  }
}

export { selectPieceList };
