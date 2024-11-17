import Board from "./BoardMembers/Board.js";
import util from "util";

function play() {
  let board = new Board();
  //console.log(util.inspect(board, { depth: null })); // Fully expands nested objects
  console.log(board.renderInConsole());
}

export default play;
