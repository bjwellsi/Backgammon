import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";

class GameController {
  constructor() {
    this.board = new Board();
    this.UserInput = new UserInput();
  }

  async playGame() {
    //initialize the game
    //get a single roll from each team
    //compare the rolls, give the lower roll to the higher team, it's now their turn
    //if the rolls were equal, just restart the process
    let board = this.board;
    let blackRoll = 0;
    let whiteRoll = 0;
    let currentTeam;
    do {
      await this.UserInput.getInput("Black, hit enter to roll the die\n");
      blackRoll = board.teams[0].dice.rollForIniative();
      console.log(`You rolled ${blackRoll}\n`);
      await this.UserInput.getInput("Now white, hit enter to roll the die\n");
      whiteRoll = board.teams[1].dice.rollForIniative();
      console.log(`You rolled ${whiteRoll}\n`);
      if (whiteRoll > blackRoll) {
        board.teams[1].dice.addRoll(blackRoll);
        board.teams[0].dice.clearDice();
        board.turn = "white";
        currentTeam = board.teams[1];
        console.log("White goes first!\n");
      } else if (whiteRoll < blackRoll) {
        board.teams[0].dice.addRoll(whiteRoll);
        board.teams[1].dice.clearDice();
        board.turn = "black";
        currentTeam = board.teams[0];
        console.log("Black goes first!\n");
      }
    } while (blackRoll == whiteRoll);
    console.log(this.board.renderInConsole());

    const rollDice = async (team) => {
      await this.UserInput.getInput("Hit enter to roll the dice\n");
      let roll = team.dice.roll();
      console.log(`You rolled ${roll}\n`);
    };

    const nextTurn = () => {
      board.teams[1].dice.clearDice();
      board.teams[0].dice.clearDice();
      if (board.turn == "black") {
        board.turn = "white";
        currentTeam = board.teams[1];
      } else {
        board.turn = "black";
        currentTeam = board.teams[0];
      }
      console.log(`${board.turn}'s turn\n`);
    };

    const runTurn = async (team) => {
      while (team.dice.rollsRemain()) {
        try {
          console.log(this.board.renderInConsole());
          if (!team.jail.empty()) {
            //they're in jail
            console.log("You're in jail!\n");
            console.log(`${team.dice.renderInConsole()}\n`);
            //check their dice against the board
            let inmate = team.jail.pieces[0];
            let hasOptions = false;
            for (let i = 0; i < team.dice.rolls.length; i++) {
              if (board.spaceAvailable(team.dice.rolls[i], inmate)) {
                hasOptions = true;
              }
            }
            if (!hasOptions) {
              //can't get out of jail this turn
              console.log("You can't get out this turn!\n");
              team.dice.clearDice();
            } else {
              //tell them to make a move and how to format that move
              let move = await this.UserInput.getInput(
                `Where would you like to move? (Just type the column number)\n`,
              );
              try {
                let column = parseInt(move);
                board.jailBreak(column - 1, team);
                console.log(`Moved from jail to column ${column}`);
              } catch (error) {
                throw Error(`Illegal move. ${error.message}`);
              }
            }
          } else {
            let move = await this.UserInput.getInput(
              `${team.color}, what's your next move?\n 
Moves left: ${team.dice.rolls}\n`,
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
      console.log(this.board.renderInConsole());
      nextTurn();
    };

    //
    //while the game hasn't been won, do the following:
    //as long as there are rolls left, get the next move from the team whose turn it is

    //check whether the game is won
    //change the active team
    //roll the dice
    //repeat the last 4 steps
    await runTurn(currentTeam); //gotta do the first turn before starting the loop so you can check win status at the beginning of the loop

    while (!board.teams[1].home.homeFull() && !board.teams[0].home.homeFull()) {
      await rollDice(currentTeam);
      await runTurn(currentTeam);
    }

    let winner = "black";
    if (board.teams[1].home.homeFull()) {
      winner = "white";
    }
    await UserResponse(
      `Congrats ${winner}, you won!\nHit enter to play again!\n`,
    );
    await playGame();
  }
}

export default GameController;
