import Board from "./Models/Board.js";
import UserInput from "./UserInput.js";
import ConsoleView from "./ConsoleView.js";

class GameControlFlow {
  constructor() {
    this.board = new Board();
    this.userInteraction = new UserInput();
    this.view = new ConsoleView();
  }

  //
  //
  //
  //K so my thought is
  //take all the responses and errors out, move them to some interface
  //  done
  //take all the renderInConsole's out, the frontend should be controlled by some other interface.
  //
  //make all the moves a result of passing the turnaction around, how those moves get communicated to this class should be out of
  //  its purview
  //
  //all this class needs to do is control the flow of the game
  //
  //so just initialize the game, step through the steps, control the rules of what can and can't be done
  //
  //as far as checking if you can make a move bc you're in jail for ex, we may just want to pass "turn action"
  //  to some board method, and have it determine if the action is legal
  //
  //at that point I'm not sure if there's even a point in having this class though. I guess just to coordinate the other services
  //  - console vs frontend vs api for ex
  //
  //
  //k the first thing I'm gonna do is migrate to a modular user interface. the rest is gonna just confuse the issue

  async rollDice() {
    await this.userInteraction.getInput(
      "Hit enter to roll the dice\n",
      "detailed",
    );
    let roll = this.board.currentTeam().dice.roll();
    this.userInteraction.createOutput(`You rolled ${roll}\n`, "detailed");
  }

  async runTurn() {
    // k so to clean this up I'm gonna basically rewrite this.
    // basically the board should already handle the logic of checking if the move was legal
    // if they're allowed to be moving or not, because they're in jail, or if the distance was acceptable
    // all this needs to do is
    // 1 manage the flow, so start the game, initiate the first turn, and process user requests
    // 2 check for certain conditions, like do they have legal moves left. If they don't, just process them out
    //
    //
    //
  }

  async runTurn() {
    let board = this.board;
    let team = this.board.currentTeam();
    while (team.dice.rollsRemain()) {
      try {
        this.view.reloadObject(board);
        if (!team.jail.empty()) {
          //they're in jail
          this.userInteraction.createOutput("You're in jail!\n", "detailed");
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
            this.userInteraction.createOutput(
              "You can't get out this turn!\n",
              "detailed",
            );
            board.changeTurn();
          } else {
            //tell them to make a move and how to format that move
            let move = await this.userInteraction.getInput(
              `Where would you like to move? (Just type the column number)\n`,
              "detailed",
            );
            try {
              let column = parseInt(move);
              board.jailBreak(column - 1);
              this.userInteraction.createOutput(
                `Moved from jail to column ${column}\n`,
                "detailed",
              );
            } catch (error) {
              throw Error(`Illegal move. ${error.message}\n`);
            }
          }
        } else {
          let move = await this.userInteraction.getInput(
            `${team.color}, what's your next move?\n`,
            "detailed",
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
                this.userInteraction.createOutput(
                  `Piece moved home from ${fromCol + 1}\n`,
                  "detailed",
                );
              } else {
                board.movePiece(fromCol, toCol);
                this.userInteraction.createOutput(
                  `Piece moved from ${fromCol + 1} to ${toCol + 1}\n`,
                  "detailed",
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
        this.userInteraction.createOutput(error.message, "detailed");
      }
    }
    this.view.reloadObject(board);
    board.changeTurn();
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
      await this.userInteraction.getInput(
        "Black, hit enter to roll the die\n",
        "detailed",
      );
      blackRoll = board.teams[0].dice.rollForIniative();
      this.userInteraction.createOutput(
        `You rolled ${blackRoll}\n`,
        "detailed",
      );
      await this.userInteraction.getInput(
        "Now white, hit enter to roll the die\n",
        "detailed",
      );
      whiteRoll = board.teams[1].dice.rollForIniative();
      this.userInteraction.createOutput(
        `You rolled ${whiteRoll}\n`,
        "detailed",
      );
      if (whiteRoll > blackRoll) {
        board.teams[1].dice.addRoll(blackRoll);
        board.teams[0].dice.clearRolls();
        board.setStartingTurn("white", "black");
        this.userInteraction.createOutput("White goes first!\n", "detailed");
      } else if (whiteRoll < blackRoll) {
        board.teams[0].dice.addRoll(whiteRoll);
        board.teams[1].dice.clearRolls();
        board.setStartingTurn("black", "white");

        this.userInteraction.createOutput("Black goes first!\n", "detailed");
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

    await this.userInteraction.getInput(
      `Congrats ${winner.color}, you won!\nHit enter to play again!\n`,
      "detailed",
    );
    await this.playGame(); //restart the game
  }
}

export default GameControlFlow;
