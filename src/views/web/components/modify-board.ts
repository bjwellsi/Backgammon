import TurnAction from "../../../models/turn-action";

let selectedDiv: HTMLDivElement | null;

function movePiece(event: MouseEvent): TurnAction | void {
  let currentDiv = event.currentTarget as HTMLDivElement;

  if (selectedDiv == null) {
    selectedDiv = currentDiv;
  } else {
    //create a turn action
    let from = getContainerID(selectedDiv);
    let to = getContainerID(currentDiv);
    return new TurnAction(from, to);
  }
}

function getContainerID(div: HTMLDivElement): number | string {
  if (div.classList.contains("jail")) {
    return "jail";
  } else if (div.classList.contains("home")) {
    return "home";
  } else {
    let ret = Number(div.id);
    if (isNaN(ret)) {
      throw Error("Invalid container id format\n");
    }
    return ret;
  }
}

export { movePiece };
