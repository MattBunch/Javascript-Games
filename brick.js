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
titleCard.src = "/second/img/brick-game-title-screen.png"; // FIXME: remove /second/ from the titlecard file path if necessary

let mouseX = 0;
let mouseY = 0;

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// draw image on canvas upon load
titleCard.onload = function () {
  ctx.drawImage(titleCard, 10, 10);
};

function centerScreenOnCanvas() {
  location.href = "#";
  location.href = "#canvas";
}

/**
 * 
  ____       _      _       ____  _     _           _   
 |  _ \     (_)    | |     / __ \| |   (_)         | |  
 | |_) |_ __ _  ___| | __ | |  | | |__  _  ___  ___| |_ 
 |  _ <| '__| |/ __| |/ / | |  | | '_ \| |/ _ \/ __| __|
 | |_) | |  | | (__|   <  | |__| | |_) | |  __/ (__| |_ 
 |____/|_|  |_|\___|_|\_\  \____/|_.__/| |\___|\___|\__|
                                      _/ |              
                                     |__/               
 */

const brickWidth = 80;
const brickHeight = 25;
const brickGap = 2;
const brickCol = 5;
let brickRows = 12;
let brickGrid = new Array(brickCol * brickRows);
let brickCount = 0;

/**
 * 
  ____        _ _    ____  _     _           _   
 |  _ \      | | |  / __ \| |   (_)         | |  
 | |_) | __ _| | | | |  | | |__  _  ___  ___| |_ 
 |  _ < / _` | | | | |  | | '_ \| |/ _ \/ __| __|
 | |_) | (_| | | | | |__| | |_) | |  __/ (__| |_ 
 |____/ \__,_|_|_|  \____/|_.__/| |\___|\___|\__|
                               _/ |              
                              |__/               
 */

let ballX = 75;
let ballSpeedX = 8;
let ballY = 75;
let ballSpeedY = 8;

let ballStartingX = canvas.width / 2;
let ballStartingY = canvas.height / 2 + 50;
let newBallX;
let newBallY;

/**
 *
  _____          _     _ _         ____  _     _           _   
 |  __ \        | |   | | |       / __ \| |   (_)         | |  
 | |__) |_ _  __| | __| | | ___  | |  | | |__  _  ___  ___| |_ 
 |  ___/ _` |/ _` |/ _` | |/ _ \ | |  | | '_ \| |/ _ \/ __| __|
 | |  | (_| | (_| | (_| | |  __/ | |__| | |_) | |  __/ (__| |_ 
 |_|   \__,_|\__,_|\__,_|_|\___|  \____/|_.__/| |\___|\___|\__|
                                             _/ |              
                                            |__/               

 */

let paddleX = canvas.width / 2;
const paddleThickness = 15;
const paddleWidth = 100;
const paddleDistanceFromEdge = 60;

/**
 * 
  __  __       _          _____                      
 |  \/  |     (_)        / ____|                     
 | \  / | __ _ _ _ __   | |  __  __ _ _ __ ___   ___ 
 | |\/| |/ _` | | '_ \  | | |_ |/ _` | '_ ` _ \ / _ \
 | |  | | (_| | | | | | | |__| | (_| | | | | | |  __/
 |_|  |_|\__,_|_|_| |_|  \_____|\__,_|_| |_| |_|\___|
                                                     
                                                     
*/

let brickScore = 0;
let brickGameInterval = false;

const framesPerSecond = 30;

const scoreTitle = document.getElementById("score");
const scoreInput = document.getElementById("scoreInput");
const startGameButton = document.getElementById("playbutton");
const submitMenu = document.getElementsByClassName("submitMenu"); // array of HTML elements

function startBrickGame() {
  brickGameInterval = setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  centerScreenOnCanvas();
  brickReset();
  ballReset();
  resetScore();

  hideSubmit();

  startGameButton.onclick = resetBrickGame;
}

function stopBrickGame() {
  clearInterval(brickGameInterval);
}

function resetBrickGame() {
  gameOver();

  startBrickGame();
}

function updateAll() {
  console.log("game running");
  movement();
  playArea();
}

function addToScore() {
  brickScore += 10;
  setScore();
}

function resetScore() {
  brickScore = 0;
  setScore();
}

function setScore() {
  scoreTitle.textContent = "Score: " + brickScore;
  scoreInput.value = brickScore;
}

function gameOver() {
  stopBrickGame();

  setTimeout(drawGameOverMessage, 1);

  setTimeout(drawGameOverScreen, 1000);

  showSubmit();
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

function ballReset() {
  ballX = ballStartingX;
  ballY = ballStartingY;
  newBallX = ballStartingX + brickHeight;
  newBallY = ballStartingY + brickHeight;
}

function ballIncrement() {
  ballX = newBallX;
  ballY = newBallY;
  newBallX += brickHeight;
  newBallY += brickHeight;
}

function brickReset() {
  brickCount = 0;
  for (let i = 0; i < 3 * brickCol; i++) {
    brickGrid[i] = false;
  }
  for (let i = 0; i < brickCol * brickRows; i++) {
    if (Math.random() < 0.5) {
      brickGrid[i] = true;
    } else {
      brickGrid[i] = false;
    }
    brickGrid[i] = true;
    brickCount++;
  }
}

function brickIncrement() {
  if (brickRows < 20) {
    brickRows++;
  }
}

function ballMove() {
  // ballMovement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // ballY
  if (ballY > canvas.height) {
    gameOver();
  } else if (ballY < 0 && ballSpeedY > 0.0) {
    ballSpeedY = -ballSpeedY;
  }
  // ballX
  if (
    (ballX > canvas.width && ballSpeedX > 0.0) ||
    (ballX < 0 && ballSpeedX < 0.0)
  ) {
    ballSpeedX = -ballSpeedX;
  }
}

function isBrickAtColRow(col, row) {
  if (col >= 0 && col < brickCol && row >= 0 && row < brickRows) {
    let brickIndexUnderCoord = rowColToArrayIndex(col, row);
    return brickGrid[brickIndexUnderCoord];
  } else {
    return false;
  }
}

function ballBrickColl() {
  let ballBrickCol = Math.floor(ballX / brickWidth);
  let ballBrickRow = Math.floor(ballY / brickHeight);
  let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
  if (
    ballBrickCol >= 0 &&
    ballBrickCol < brickCol &&
    ballBrickRow >= 0 &&
    ballBrickRow < brickRows
  ) {
    if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
      brickGrid[brickIndexUnderBall] = false;
      brickCount--;
      addToScore();

      let prevBallX = ballX - ballSpeedX;
      let prevBallY = ballY - ballSpeedY;
      let prevBrickCol = Math.floor(prevBallX / brickWidth);
      let prevBrickRow = Math.floor(prevBallY / brickHeight);

      let bothTestFailed = true;

      if (prevBrickCol != ballBrickCol) {
        if (isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
          ballSpeedX = -ballSpeedX;
          bothTestFailed = false;
        }
      }

      if (prevBrickRow != ballBrickRow) {
        if (isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
          ballSpeedY = -ballSpeedY;
          bothTestFailed = false;
        }
      }

      if (bothTestFailed) {
        ballSpeedX = -ballSpeedX;
        ballSpeedY = -ballSpeedY;
      }
    }
  }
}

function paddleMove() {
  // paddle
  let paddleTopEdgeY = canvas.height - paddleDistanceFromEdge;
  let paddleBottomEdgeY = paddleTopEdgeY + paddleThickness;
  let paddleLeftEdgeX = paddleX;
  let paddleRightEdgeX = paddleX + paddleWidth;
  if (
    ballY > paddleTopEdgeY && // top of paddle
    ballY < paddleBottomEdgeY && // bottom of paddle
    ballX > paddleLeftEdgeX && // left half of paddle
    ballX < paddleRightEdgeX // right half of paddle
  ) {
    ballSpeedY = -ballSpeedY;

    let paddleCenterX = paddleX + paddleWidth / 2;
    let ballDistFromCenterX = ballX - paddleCenterX;
    ballSpeedX = ballDistFromCenterX * 0.35;

    if (brickCount == 0) {
      brickIncrement();
      brickReset();
      // update ball x position
      ballIncrement();
    }
  }
}

function movement() {
  ballMove();
  ballBrickColl();
  paddleMove();
}

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - paddleWidth / 2;
}

/**
 * 
  _____                       ______                _   _                 
 |  __ \                     |  ____|              | | (_)                
 | |  | |_ __ __ ___      __ | |__ _   _ _ __   ___| |_ _  ___  _ __  ___ 
 | |  | | '__/ _` \ \ /\ / / |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |__| | | | (_| |\ V  V /  | |  | |_| | | | | (__| |_| | (_) | | | \__ \
 |_____/|_|  \__,_| \_/\_/   |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                                                                          
                                                                          
 */

function playArea() {
  // gameCanvas
  colorRect(0, 0, canvas.width, canvas.height, "white");
  // ball
  colorCircle();
  // paddle
  colorRect(
    paddleX,
    canvas.height - paddleDistanceFromEdge,
    paddleWidth,
    paddleThickness,
    "black"
  );

  drawbricks();
}

function colorRect(leftX, topY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(leftX, topY, width, height);
}

function colorText(showWords, textX, textY, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillText(showWords, textX, textY);
}

function rowColToArrayIndex(col, row) {
  return col + brickCol * row;
}

function drawbricks() {
  for (let eachRow = 0; eachRow < brickRows; eachRow++) {
    for (let eachCol = 0; eachCol < brickCol; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (brickGrid[arrayIndex]) {
        colorRect(
          brickWidth * eachCol,
          brickHeight * eachRow,
          brickWidth - brickGap,
          brickHeight - brickGap,
          "#f0db4f"
        );
      }
    }
  }
}

function colorCircle() {
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawGameOverMessage() {
  let messageBoxWidth = 200;
  let messageBoxHeight = 70;

  let screenCenterWidth = canvas.width / 2;
  let screenCenterHeight = canvas.height / 2;

  ctx.fillStyle = "#222";
  ctx.fillRect(
    screenCenterWidth - messageBoxWidth / 2,
    screenCenterHeight - messageBoxHeight / 2 - 5,
    messageBoxWidth,
    messageBoxHeight
  );

  ctx.fillStyle = "white";
  ctx.font = "26px Lucida Console";
  ctx.fillText("Game Over!", screenCenterWidth - 75, screenCenterHeight);
}

function drawGameOverScreen() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f0db4f";
  ctx.font = "26px Lucida Console";
  ctx.fillText("Game Over!", 10, canvas.height / 2 - 100);
  ctx.fillText("Your score was " + brickScore, 10, canvas.height / 2 - 80);

  ctx.font = "18px Lucida Console";
  ctx.fillText('Press "Play Brick" to try again', 10, canvas.height / 2 - 60);

  ctx.fillText("Submit your score below", 10, canvas.height / 2 - 40);
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
