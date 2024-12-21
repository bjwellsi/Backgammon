import "reflect-metadata";
import { populateCommands } from "./command-events";
import { displayBoard } from "./display-board";
import Board from "../../../models/board";

let board = new Board();

displayBoard(board);

populateCommands();
