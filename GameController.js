import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";

class GameController {
  constructor() {
    this.board = new Board();
    this.UserInput = new UserInput();
  }

  async playGame() {
    //initialize the game
    //get a single roll from each player
    //compare the rolls, give the lower roll to the higher player, it's now their turn
    //if the rolls were equal, just restart the process
    let board = this.board;
    let blackRoll = 0;
    let whiteRoll = 0;
    let currentPlayer;
    do {
      await this.UserInput.getInput("Black, hit enter to roll the die\n");
      blackRoll = board.blackPlayer.dice.rollForIniative();
      console.log(`You rolled ${blackRoll}\n`);
      await this.UserInput.getInput("Now white, hit enter to roll the die\n");
      whiteRoll = board.whitePlayer.dice.rollForIniative();
      console.log(`You rolled ${whiteRoll}\n`);
      if (whiteRoll > blackRoll) {
        board.whitePlayer.dice.addRoll(blackRoll);
        board.blackPlayer.dice.clearDice();
        board.turn = "white";
        currentPlayer = board.whitePlayer;
        console.log("White goes first!\n");
      } else if (whiteRoll < blackRoll) {
        board.blackPlayer.dice.addRoll(whiteRoll);
        board.whitePlayer.dice.clearDice();
        board.turn = "black";
        currentPlayer = board.blackPlayer;
        console.log("Black goes first!\n");
      }
    } while (blackRoll == whiteRoll);
    console.log(this.board.renderInConsole());

    const rollDice = async (player) => {
      await this.UserInput.getInput("Hit enter to roll the dice\n");
      let roll = player.dice.roll();
      console.log(`You rolled ${roll}\n`);
    };

    const nextTurn = () => {
      board.whitePlayer.dice.clearDice();
      board.blackPlayer.dice.clearDice();
      if (board.turn == "black") {
        board.turn = "white";
        currentPlayer = board.whitePlayer;
      } else {
        board.turn = "black";
        currentPlayer = board.blackPlayer;
      }
      console.log(`${board.turn}'s turn\n`);
    };

    const runTurn = async (player) => {
      while (player.dice.rollsRemain()) {
        try {
          console.log(this.board.renderInConsole());
          if (!player.jail.empty()) {
            //they're in jail
            console.log("You're in jail!\n");
            console.log(`${player.dice.renderInConsole()}\n`);
            //check their dice against the board
            let inmate = player.jail.pieces[0];
            let hasOptions = false;
            for (let i = 0; i < player.dice.rolls.length; i++) {
              if (board.spaceAvailable(player.dice.rolls[i], inmate)) {
                hasOptions = true;
              }
            }
            if (!hasOptions) {
              //can't get out of jail this turn
              console.log("You can't get out this turn!\n");
              player.dice.clearDice();
            } else {
              //tell them to make a move and how to format that move
              let move = await this.UserInput.getInput(
                `Where would you like to move? (Just type the column number)\n`,
              );
              try {
                let column = parseInt(move);
                board.jailBreak(column - 1, player);
                console.log(`Moved from jail to column ${column}`);
              } catch (error) {
                throw Error(`Illegal move. ${error.message}`);
              }
            }
          } else {
            let move = await this.UserInput.getInput(
              `${player.color}, what's your next move?\n 
Moves left: ${player.dice.rolls}\n`,
            );
            try {
              const cols = move.split(",").map(Number);
              let fromCol = cols[0] - 1;
              let toCol = cols[1] - 1;
              if (!player.dice.rollLegal(Math.abs(fromCol - toCol))) {
                throw Error(); //any error from this block is going to be thrown as illegal move
              } else {
                if (toCol == -1) {
                  //player is attempting to go home
                  //TODO
                  //TODO
                  //TODO handle the edge case of "didn't roll a 4, rolled a six, but 4 is the largest populated column"
                  //TODO
                  //TODO
                  //TODO
                  //TODO
                  board.goHome(fromCol);
                  console.log(`Piece moved home from ${fromCol + 1}\n`);
                } else {
                  board.movePiece(fromCol, toCol);
                  console.log(
                    `Piece moved from ${fromCol + 1} to ${toCol + 1}\n`,
                  );
                }
              }
            } catch (error) {
              throw Error(`Illegal move. ${error.message}\n
Format your move like this, "3,4" (without the quotes), to move from column 3 to column 4\n
If you want to move a piece home, use 0 as your to column (3,0 for ex.)\n`);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      console.log(this.board.renderInConsole());
      nextTurn();
    };

    //
    //while the game hasn't been won, do the following:
    //as long as there are rolls left, get the next move from the player whose turn it is

    //check whether the game is won
    //change the active player
    //roll the dice
    //repeat the last 4 steps
    await runTurn(currentPlayer); //gotta do the first turn before starting the loop so you can check win status at the beginning of the loop

    while (
      !board.whitePlayer.home.homeFull() &&
      !board.blackPlayer.home.homeFull()
    ) {
      await rollDice(currentPlayer);
      await runTurn(currentPlayer);
    }

    let winner = "black";
    if (board.whitePlayer.home.homeFull()) {
      winner = "white";
    }
    await UserResponse(
      `Congrats ${winner}, you won!\nHit enter to play again!\n`,
    );
    await playGame();
  }
}

export default GameController;
