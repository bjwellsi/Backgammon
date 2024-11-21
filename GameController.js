import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";

class GameController {
  constructor() {
    this.board = new Board();
    this.UserInput = new UserInput();
  }

  async rollDice() {
    await this.UserInput.getInput("Hit enter to roll the dice\n");
    let roll = this.board.currentTeam().dice.roll();
    console.log(`You rolled ${roll}\n`);
  }

  async runTurn() {
    let board = this.board;
    let team = this.board.currentTeam();
    while (team.dice.rollsRemain()) {
      try {
        console.log(board.renderInConsole());
        if (!team.jail.empty()) {
          //they're in jail
          console.log("You're in jail!\n");
          console.log(`${team.dice.renderInConsole()}\n`);
          //check their dice against the board
          let inmate = team.jail.getFirstPiece();
          let hasOptions = false;
          for (let i = 0; i < team.dice.rolls.length; i++) {
            if (board.columns[i].approvedForMove(inmate)) {
              hasOptions = true;
            }
          }
          if (!hasOptions) {
            //can't get out of jail this turn
            console.log("You can't get out this turn!\n");
            board.changeTurn();
          } else {
            //tell them to make a move and how to format that move
            let move = await this.UserInput.getInput(
              `Where would you like to move? (Just type the column number)\n`,
            );
            try {
              let column = parseInt(move);
              board.jailBreak(column - 1);
              console.log(`Moved from jail to column ${column}\n`);
            } catch (error) {
              throw Error(`Illegal move. ${error.message}\n`);
            }
          }
        } else {
          let move = await this.UserInput.getInput(
            `${team.color}, what's your next move?\n 
${team.dice.renderInConsole()}\n`,
          );
          try {
            const cols = move.split(",").map(Number);
            let fromCol = cols[0] - 1;
            let toCol = cols[1] - 1;
            if (!team.dice.rollLegal(Math.abs(fromCol - toCol))) {
              throw Error(); //any error from this block is going to be thrown as illegal move
            } else {
              if (toCol == -1) {
                //team is attempting to go home
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
    board.changeTurn();
    console.log(board.renderInConsole());
  }

  async runFirstTurn() {
    //initialize the game
    //get a single roll from each team
    //compare the rolls, give the lower roll to the higher team, it's now their turn
    //if the rolls were equal, just restart the process
    let board = this.board;
    let blackRoll = 0;
    let whiteRoll = 0;
    do {
      await this.UserInput.getInput("Black, hit enter to roll the die\n");
      blackRoll = board.teams[0].dice.rollForIniative();
      console.log(`You rolled ${blackRoll}\n`);
      await this.UserInput.getInput("Now white, hit enter to roll the die\n");
      whiteRoll = board.teams[1].dice.rollForIniative();
      console.log(`You rolled ${whiteRoll}\n`);
      if (whiteRoll > blackRoll) {
        board.teams[1].dice.addRoll(blackRoll);
        board.teams[0].dice.clearRolls();
        board.setStartingTurn("white", "black");
        console.log("White goes first!\n");
      } else if (whiteRoll < blackRoll) {
        board.teams[0].dice.addRoll(whiteRoll);
        board.teams[1].dice.clearRolls();
        board.setStartingTurn("black", "white");
        console.log("Black goes first!\n");
      }
    } while (blackRoll == whiteRoll);

    await this.runTurn(); //gotta do the first turn before starting the loop so you can check win status at the beginning of the loop
  }

  async playGame() {
    await this.runFirstTurn();

    let winner = this.board.winner();

    while (winner === undefined) {
      await this.rollDice();
      await this.runTurn();
      winner = this.board.winner(); //check if someone has won
    }

    await UserResponse(
      `Congrats ${winner.color}, you won!\nHit enter to play again!\n`,
    );
    await this.playGame(); //restart the game
  }
}

export default GameController;
