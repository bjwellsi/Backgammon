import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";

class GameController {
  constructor() {
    this.board = new Board();
    this.UserInput = new UserInput();
  }

  async playGame() {
    //fake couple moves for testing manually
    /*    this.board.turn = "black";
    this.board.blackPlayer.dice.rolls.push(2);
    this.board.blackPlayer.dice.rolls.push(1);
    console.log(this.board.renderInConsole());
    this.board.movePiece(5, 3);
    console.log(this.board.renderInConsole());
    this.board.movePiece(5, 4);
    console.log(this.board.renderInConsole());

    this.board.turn = "white";
    this.board.whitePlayer.dice.rolls.push(3);
    this.board.whitePlayer.dice.rolls.push(4);
    console.log(this.board.renderInConsole());
    this.board.movePiece(0, 3);
    console.log(this.board.renderInConsole());
    this.board.movePiece(0, 4);
    console.log(this.board.renderInConsole());
    */

    //initialize the game
    //get a single roll from each player
    //compare the rolls, give the lower roll to the higher player, it's now their turn
    //if the rolls were equal, just restart the process
    let board = this.board;
    let blackRoll = 0;
    let whiteRoll = 0;
    let currentPlayer;
    do {
      let userResponse;
      userResponse = await this.UserInput.getInput(
        "Black, type anything to roll the die\n",
      );
      blackRoll = board.blackPlayer.dice.rollForIniative();
      console.log(
        `You typed ${userResponse}, weird choice. You rolled ${blackRoll}`,
      );
      userResponse = await this.UserInput.getInput(
        "Now white, type anything to roll the die\n",
      );
      whiteRoll = board.whitePlayer.dice.rollForIniative();
      console.log(
        `You typed ${userResponse}, also weird choice. You rolled ${whiteRoll}`,
      );
      console.log(`Black rolled ${blackRoll}, white rolled ${whiteRoll}`);
      if (whiteRoll > blackRoll) {
        board.whitePlayer.dice.addRoll(blackRoll);
        board.blackPlayer.dice.clearDice();
        board.turn = "white";
        currentPlayer = board.whitePlayer;
        console.log("White goes first!");
      } else if (whiteRoll < blackRoll) {
        board.blackPlayer.dice.addRoll(whiteRoll);
        board.whitePlayer.dice.clearDice();
        board.turn = "black";
        currentPlayer = board.blackPlayer;
        console.log("Black goes first!");
      }
    } while (blackRoll == whiteRoll);
    console.log(this.board.renderInConsole());

    const runTurn = async (player) => {
      while (player.dice.rollsRemain()) {
        try {
          console.log(this.board.renderInConsole());
          let move = await this.UserInput.getInput(
            `${player.color}, what's your next move?\n 
Format it like this: "3,4" (from column, to column)\n
Moves left: ${player.dice.rolls}\n`,
          );
          let fromCol = parseInt(move[0]) - 1;
          let toCol = parseInt(move[2]) - 1;
          if (!player.dice.rollLegal(Math.abs(fromCol - toCol))) {
            throw Error("Illegal move");
          } else {
            board.movePiece(fromCol, toCol);
            console.log(`Piece moved from ${fromCol} to ${toCol}`);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      console.log(this.board.renderInConsole());
      nextTurn();
    };

    const rollDice = async (player) => {
      await this.UserInput.getInput("Hit enter to roll the dice\n");
      let roll = player.dice.roll();
      console.log(`You rolled ${roll}`);
    };

    const nextTurn = () => {
      if (board.turn == "black") {
        board.turn = "white";
        currentPlayer = board.whitePlayer;
      } else {
        board.turn = "black";
        currentPlayer = board.blackPlayer;
      }
      console.log(`${board.turn}'s turn`);
    };
    //while the game hasn't been won, do the following:
    //as long as there are rolls left, get the next move from the player whose turn it is

    //check whether the game is won
    //change the active player
    //roll the dice
    //repeat the last 4 steps

    await runTurn(currentPlayer);

    while (
      !board.whitePlayer.home.homeFull() &&
      !board.blackPlayer.home.homeFull()
    ) {
      await rollDice(currentPlayer);
      await runTurn(currentPlayer);
    }
  }
}

export default GameController;
