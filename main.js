"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		// Replace with your own code //
		// Set the home position at (0, 0) before the game starts
		this.row = 0;
		this.column = 0;
		this.field[this.row][this.column] = pathCharacter;
	}

	// Print field //
	print() {
		clear();
		// Replace with your own code //
    for (let i = 0; i < this.field.length; i++) {
      let row = this.field[i];
      let rowStrings = [];
    for (let j = 0; j < row.length; j++) {
      rowStrings.push('"' + row[j] + '"');
    }
    console.log("[" + rowStrings.join(", ") + "],");
	}
}

	// Your Code //
	//step 2 create direction method and check position requirement
	moveUp() {
    this.row--;
    this.checkPosition();
  }

  moveDown() {
    this.row++;
    this.checkPosition();
  }

  moveLeft() {
    this.column--;
    this.checkPosition();
  }

  moveRight() {
    this.column++;
    this.checkPosition();
  }

  checkPosition() {
    if (
      this.row < 0 ||
      this.row >= this.field.length ||
      this.column < 0 ||
      this.column >= this.field[0].length
    ) {
      console.log("You stepped out of bounds! Game Over.");
      process.exit();
    }

    //peek the player position
    const tile = this.field[this.row][this.column];

    if (tile === hole) {
      console.log("You fell into a hole! Game Over.");
      process.exit();
    } else if (tile === hat) {
      console.log("You found your hat! You win!");
      process.exit();
    }

    this.field[this.row][this.column] = pathCharacter;
  }

 //Step 3 get input from player
  askQuestion() {
    //Warning when player stay on border
    if (
      this.row === 0 ||
      this.row === this.field.length -1 ||
      this.column === 0 ||
      this.column === this.field.length -1
    ) {
      console.log("Waring: You are near the edge O_O");
    }

    const direction = prompt(
      "Please choose your direction. (u = up, d = down, l = left, r = right): "
    ).toLowerCase();
    
    switch (direction) {
      case "u":
        this.moveUp();
        break;
      case "d":
        this.moveDown();
        break;
      case "l":
        this.moveLeft();
        break;
      case "r":
        this.moveRight();
        break;
      default:
        console.log("Invalid input. Use u, d, l, or r.");
    }
  }

  //step 4 create random hole and player starting point
  static generateField(height, width, holePercentage = 0.3) {
    const field = new Array(height).fill(null).map(() =>
      new Array(width).fill(fieldCharacter)
    );

    field[0][0] = pathCharacter;

    const numberOfHoles = Math.floor(height * width * holePercentage);
    let holesPlaced = 0;
    while (holesPlaced < numberOfHoles) {
      const randRow = Math.floor(Math.random() * height);
      const randCol = Math.floor(Math.random() * width);

      if (
        field[randRow][randCol] === fieldCharacter &&
        !(randRow === 0 && randCol === 0)
      ) {
        field[randRow][randCol] = hole;
        holesPlaced++;
      }
    }
    // Step 5 Randomly place the hat (^) on an empty spot not starting point
    while (true) {
      const randRow = Math.floor(Math.random() * height);
      const randCol = Math.floor(Math.random() * width);

      if (
        field[randRow][randCol] === fieldCharacter &&
        !(randRow === 0 && randCol === 0)
      ) {
        field[randRow][randCol] = hat;
        break;
      }
    }

    return field; // Return the generated field array
  }
}

// Game Mode ON

//Step 6 generate random map with 3*3 
const map = Field.generateField(3,3);
const newGame = new Field(map);

while (true) {
  newGame.print();
  newGame.askQuestion();
}
