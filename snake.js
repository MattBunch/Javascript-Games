/*
  ____     _   _       _       _  __  U _____ u 
 / __"| u | \ |"|  U  /"\  u  |"|/ /  \| ___"|/ 
<\___ \/ <|  \| |>  \/ _ \/   | ' /    |  _|"   
 u___) | U| |\  |u  / ___ \ U/| . \\u  | |___   
 |____/>> |_| \_|  /_/   \_\  |_|\_\   |_____|  
  )(  (__)||   \\,-.\\    >>,-,>> \\,-.<<   >>  
 (__)     (_")  (_/(__)  (__)\.)   (_/(__) (__) 

*/

/*
_____                             _____      _                
/ ____|                           / ____|    | |              
| |     __ _ _ ____   ____ _ ___  | (___   ___| |_ _   _ _ __  
| |    / _` | '_ \ \ / / _` / __|  \___ \ / _ \ __| | | | '_ \ 
| |___| (_| | | | \ V / (_| \__ \  ____) |  __/ |_| |_| | |_) |
\_____\__,_|_| |_|\_/ \__,_|___/ |_____/ \___|\__|\__,_| .__/ 
                                                      | |    
                                                      |_|                                 
                                                      
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const titleCard = new Image();
titleCard.src = "/second/img/snake-game-title-screen.png"; // FIXME: remove /second/ from the titlecard file path if necessary

function drawBackground() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// draw image on canvas upon load
titleCard.onload = function () {
  ctx.drawImage(titleCard, 10, 10);
};

function loadMuteSettings() {
  muted = localStorage.getItem("muteKey");
  console.log(muted);
  console.log("local storage: " + localStorage.getItem("muteKey"));
}

/*
  _  __                          _     
 | |/ /                         | |    
 | ' / ___ _   _ _ __  _   _ ___| |__  
 |  < / _ \ | | | '_ \| | | / __| '_ \ 
 | . \  __/ |_| | |_) | |_| \__ \ | | |
 |_|\_\___|\__, | .__/ \__,_|___/_| |_|
            __/ | |                    
           |___/|_|                    


*/
let lastPressedButton;

// prevent screen from moving upon arrow keys and spacebar
document.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener("keydown", keyPush);

function keyPush(evt) {
  if (snakeGameOn) {
    switch (evt.keyCode) {
      case 37: // LEFT
        if (lastPressedButton != 39) {
          snake.moveLeft();
          lastPressedButton = 37;
        }
        break;
      case 38: // UP
        if (lastPressedButton != 40) {
          snake.moveUp();
          lastPressedButton = 38;
        }
        break;
      case 39: // RIGHT
        if (lastPressedButton != 37) {
          snake.moveRight();
          lastPressedButton = 39;
        }
        break;
      case 40: // DOWN
        if (lastPressedButton != 38) {
          snake.moveDown();
          lastPressedButton = 40;
        }
        break;
      case 32: // SPACEBAR
        // stopGame();
        break;
      case 82: // R
        // resetGame();
        break;
      case 77: // M
        switch (muted) {
          case true:
            muted = false;
            storeMuteKey();
            break;
          case false:
            muted = true;
            storeMuteKey();
            break;
        }
        break;
    }
  }
}

function storeMuteKey() {
  // console.log(muted);
  localStorage.setItem("muteKey", muted);
  // console.log("local storage: " + localStorage.getItem("muteKey"));
}

/**
 * 37: LEFT
 * 38: UP
 * 39: RIGHT
 * 40: DOWN
 * */

function lastPressedButtonConverter(input) {
  switch (input.toLowerCase()) {
    case "up":
      lastPressedButton = 38;
      break;
    case "down":
      lastPressedButton = 40;
      break;
    case "left":
      lastPressedButton = 37;
      break;
    case "right":
      lastPressedButton = 39;
      break;
  }
}

/*
   ____  _     _           _       
  / __ \| |   (_)         | |      
 | |  | | |__  _  ___  ___| |_ ___ 
 | |  | | '_ \| |/ _ \/ __| __/ __|
 | |__| | |_) | |  __/ (__| |_\__ \
  \____/|_.__/| |\___|\___|\__|___/
             _/ |                  
            |__/                                
                                  
*/
let gridSize = 20;
let tileCount = 20;

let snakeStartingPosition1 = generateSnakeStartingPosition();
let snakeStartingPosition2 = generateSnakeStartingPosition();

let snakeStartingVelocityArray = generateStartingVelocity();

let snake = {
  xPosition: snakeStartingPosition1,
  yPosition: snakeStartingPosition2,
  xVelocity: snakeStartingVelocityArray[0],
  yVelocity: snakeStartingVelocityArray[1],
  size: 5,
  trail: [],
  isDead: false,
  moveLeft: function () {
    this.xVelocity = -1;
    this.yVelocity = 0;
  },
  moveRight: function () {
    this.xVelocity = 1;
    this.yVelocity = 0;
  },
  moveUp: function () {
    this.xVelocity = 0;
    this.yVelocity = -1;
  },
  moveDown: function () {
    this.xVelocity = 0;
    this.yVelocity = 1;
  },
  updatePosition: function () {
    this.xPosition += this.xVelocity;
    this.yPosition += this.yVelocity;
    // BORDERS
    if (this.xPosition < 0) {
      // TOP
      this.xPosition = tileCount - 1;
    }
    if (this.xPosition > tileCount - 1) {
      // BOTTOM
      this.xPosition = 0;
    }
    if (this.yPosition < 0) {
      // LEFT
      this.yPosition = tileCount - 1;
    }
    if (this.yPosition > tileCount - 1) {
      // RIGHT
      this.yPosition = 0;
    }
  },
  draw: function () {
    ctx.fillStyle = "lime";
    for (let i = 0; i < this.trail.length; i++) {
      ctx.fillRect(
        this.trail[i].x * gridSize,
        this.trail[i].y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
      if (snakeOverlapsWithItself(this.trail, i) && this.trail.length >= 5) {
        gameOver();
      }
    }
  },
  initializeTrail: function () {
    this.trail.push({ x: this.xPosition, y: this.yPosition });
    while (this.trail.length > this.size) {
      this.trail.shift();
    }
  },
  eatFood: function () {
    if (snakeOverlapsWithFood()) {
      this.size++;

      food.updatePosition();

      addToScore();

      if (!snake.isDead) {
        playSound("gulp");
      }
    }
  },
  die: function () {
    // this.xPosition = -1;
    // this.yPosition = -1;
    this.xVelocity = 0;
    this.yVelocity = 0;
    // this.trail = [];
    // this.size = 0;
    this.isDead = true;
    playSound("death");
  },
  // TEMP METHOD TODO: delete
  printTrail: function () {
    for (let i = 0; i < this.trail.length; i++) {
      console.log(this.trail[i]);
    }
  },
};

let foodStartingPosition = generateFoodPosition();

let food = {
  foodXPosition: foodStartingPosition[0],
  foodYPosition: foodStartingPosition[1],
  draw: function () {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.foodYPosition * gridSize,
      this.foodXPosition * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  },
  updatePosition: function () {
    let newPosition;

    while (typeof newPosition == "undefined") {
      newPosition = generateFoodPosition();
    }

    food.foodXPosition = newPosition[0];
    food.foodYPosition = newPosition[1];
  },
};

/*
   _____                      
  / ____|                     
 | |  __  __ _ _ __ ___   ___ 
 | | |_ |/ _` | '_ ` _ \ / _ \
 | |__| | (_| | | | | | |  __/
  \_____|\__,_|_| |_| |_|\___|
                              
  
  1. draw background
  2. draw snake
  3. draw food
*/

function generateSnakeStartingPosition() {
  return Math.floor(Math.random() * gridSize);
}

function generateStartingVelocity() {
  switch (Math.floor(Math.random() * 4)) {
    case 0: // LEFT
      lastPressedButtonConverter("left");
      return [-1, 0];
    case 1: // RIGHT
      lastPressedButtonConverter("right");
      return [1, 0];
    case 2: // UP
      lastPressedButtonConverter("up");
      return [0, -1];
    case 3: // DOWN
      lastPressedButtonConverter("down");
      return [0, 1];
  }
}

function snakeOverlapsWithFood() {
  return (
    snake.xPosition == food.foodYPosition &&
    snake.yPosition == food.foodXPosition
  );
}

function snakeOverlapsWithItself(trail, i) {
  return trail[i].x == snake.xPosition && trail[i].y == snake.yPosition;
}

function overlappingFoodPosition(position) {
  let output = false;
  for (let i = 0; i < snake.trail.length; i++) {
    // console.log(
    //   "considered position x: " +
    //     position[1] +
    //     ", considered position y: " +
    //     position[0] +
    //     "\n" +
    //     "snake.trail[i].x: " +
    //     snake.trail[i].x +
    //     ", snake.trail[i].y: " +
    //     snake.trail[i].y
    // );
    if (snake.trail[i].x == position[1] && snake.trail[i].y == position[0]) {
      // let alertMessage =
      //   "\n##########################\nALERT: overlappingfoodposition: " +
      //   position[1] +
      //   ", " +
      //   position[0] +
      //   "\n##########################\n";
      // console.log(alertMessage);
      // alert(alertMessage);
      // console.log("snake.trail[i].x: " + snake.trail[i].x);
      // console.log("snake.trail[i].y: " + snake.trail[i].y);
      output = true;
      // stopGame();
      return output;
    }
  }
  return output;
}

function generateFoodPosition() {
  let num1 = generatePositionNumber();
  let num2 = generatePositionNumber();
  let position = [num2, num1];

  // console.log("new position: " + position);

  if (overlappingFoodPosition(position)) {
    // console.log("OVERLAPPING POSITION: " + position);
  } else {
    return position;
  }
}

function generatePositionNumber() {
  return Math.floor(Math.random() * tileCount);
}

// generateStartingVelocity();

// FOR DEBUGGING TODO: delete on completition
function printDebug() {
  console.log("lastPressedButton: " + lastPressedButton);
  console.log("xVelocity: " + snake.xVelocity);
  console.log("yVelocity: " + snake.yVelocity);
  console.log("Snake xPosition: " + snake.xPosition);
  console.log("Snake yPosition: " + snake.yPosition);
  console.log("Food xPosition: " + food.foodXPosition);
  console.log("Food yPosition: " + food.foodYPosition);
  console.log("gameOn: " + snakeGameOn);
  console.log("score: " + snakeScore);
  console.log("ctx color: " + ctx.fillStyle);
}

/**
 * 
                             _____       _                       _ 
                            |_   _|     | |                     | |
   __ _  __ _ _ __ ___   ___  | |  _ __ | |_ ___ _ ____   ____ _| |
  / _` |/ _` | '_ ` _ \ / _ \ | | | '_ \| __/ _ \ '__\ \ / / _` | |
 | (_| | (_| | | | | | |  __/_| |_| | | | ||  __/ |   \ V / (_| | |
  \__, |\__,_|_| |_| |_|\___|_____|_| |_|\__\___|_|    \_/ \__,_|_|
   __/ |                                                           
  |___/                                                            
 *
 */

let snakeGameInterval = false;
let snakeGameOn = false;
let snakeScore = 0;
const framesPerSecond = 15;

const gameTitle = document.getElementById("title");
const startGameButton = document.getElementById("playbutton");
const scoreTitle = document.getElementById("score");
const scoreInput = document.getElementById("scoreInput");
const submitMenu = document.getElementsByClassName("submitMenu"); // array of HTML elements

setScore();

function startSnakeGame() {
  snakeGameOn = true;
  centerScreenOnCanvas();
  snakeGameInterval = setInterval(gameSnake, 1000 / framesPerSecond);
  startGameButton.onclick = resetGame;
}

function stopGame() {
  snakeGameOn = false;
  clearInterval(snakeGameInterval);
}

function gameOver() {
  snake.die();

  food.draw();
  stopGame();

  setTimeout(drawGameOverScreen, 1000);

  showSubmit();
  // drawGameOverScreen();
}

function resetGame() {
  if (snakeGameOn) {
    stopGame();
  }

  // reset snake
  snake.size = 5;
  let newVelocity = generateStartingVelocity();
  snake.xVelocity = newVelocity[0];
  snake.yVelocity = newVelocity[1];
  snake.xPosition = generateSnakeStartingPosition();
  snake.yPosition = generateSnakeStartingPosition();
  snake.trail = [];
  snake.isDead = false;

  // reset food
  let newFoodPosition = generateFoodPosition();
  while (typeof newFoodPosition == "undefined") {
    newFoodPosition = generateFoodPosition();
  }
  food.foodXPosition = newFoodPosition[0];
  food.foodYPosition = newFoodPosition[1];

  // hide submit button
  hideSubmit();

  resetScore();
  drawBackground();
  startSnakeGame();

  centerScreenOnCanvas();
  // printDebug();
  // gameInterval = setInterval(game, 1000 / 15);

  // console.log("gameInterval: " + gameInterval);
}

function centerScreenOnCanvas() {
  location.href = "#";
  location.href = "#canvas";
}

function drawGameOverScreen() {
  drawBackground();
  ctx.fillStyle = "#f0db4f";
  ctx.font = "26px Lucida Console";
  ctx.fillText("Game Over!", 10, canvas.height / 2 - 100);

  ctx.fillText("Your score was " + snakeScore, 10, canvas.height / 2 - 80);

  ctx.font = "18px Lucida Console";

  ctx.fillText('Press "Play Snake" to try again', 10, canvas.height / 2 - 60);

  ctx.fillText("Submit your score below", 10, canvas.height / 2 - 40);
}

function hideSubmit() {
  for (let i = 0; i < submitMenu.length; i++) {
    submitMenu[i].style.display = "none";
  }
}

function showSubmit() {
  for (let i = 0; i < submitMenu.length; i++) {
    submitMenu[i].style.display = "block";
  }
}

function addToScore() {
  snakeScore += 10;
  setScore();
}

function resetScore() {
  snakeScore = 0;
  setScore();
}

function setScore() {
  scoreTitle.textContent = "Score: " + snakeScore;
  scoreInput.value = snakeScore;
}

function checkWinningCondition() {
  if (snake.size === gridSize * gridSize) {
    stopGame();
    snakeScore = 10000;
    setScore();
    drawBackground();

    ctx.fillStyle = "#f0db4f";
    ctx.font = "26px Lucida Console";
    ctx.fillText("You maxed out the game!", 10, canvas.height / 2 - 100);
  }
}

function clickSubmitScoreButton() {
  hideSubmit();
  alert(
    "New record of " +
      document.querySelector("input[name=score]").value +
      " by " +
      document.querySelector("input[name=name]").value +
      " probably added to leaderboard."
  );
}

/*

   _____                       _     
  / ____|                     | |    
 | (___   ___  _   _ _ __   __| |___ 
  \___ \ / _ \| | | | '_ \ / _` / __|
  ____) | (_) | |_| | | | | (_| \__ \
 |_____/ \___/ \__,_|_| |_|\__,_|___/
                                     
                                     
 */

let muted = false;

function playSound(input) {
  let filename;

  if (!muted) {
    switch (input) {
      case "gulp":
        filename = "audio/Gulp1.mp3";
        createAudioAndPlay(filename);
        break;
      case "death":
        filename = "audio/death1.wav";
        createAudioAndPlay(filename);
    }
  }
}

function createAudioAndPlay(filename) {
  let audio = new Audio(filename);
  audio.play();
}

/*

  __  __       _         __  __      _   _               _ 
 |  \/  |     (_)       |  \/  |    | | | |             | |
 | \  / | __ _ _ _ __   | \  / | ___| |_| |__   ___   __| |
 | |\/| |/ _` | | '_ \  | |\/| |/ _ \ __| '_ \ / _ \ / _` |
 | |  | | (_| | | | | | | |  | |  __/ |_| | | | (_) | (_| |
 |_|  |_|\__,_|_|_| |_| |_|  |_|\___|\__|_| |_|\___/ \__,_|
                                                           
                                                           
 */

function gameSnake() {
  /* 
  
    1. update snake position

    background color

    3. draw snake and fruit

    4. initialize trail

    5. check if snake and food overlap

    6. update score
  */

  snake.updatePosition();

  drawBackground();

  // check winning condition
  checkWinningCondition();

  snake.draw();

  // since snake dies in draw(), must check for snake's alive status here
  if (snake.isDead) {
    return;
  }

  food.draw();

  snake.initializeTrail();

  snake.eatFood();
}
