/*


          _____                   _______                   _____                    _____          
         /\    \                 /::\    \                 /\    \                  /\    \         
        /::\    \               /::::\    \               /::\____\                /::\    \        
       /::::\    \             /::::::\    \             /::::|   |               /::::\    \       
      /::::::\    \           /::::::::\    \           /:::::|   |              /::::::\    \      
     /:::/\:::\    \         /:::/~~\:::\    \         /::::::|   |             /:::/\:::\    \     
    /:::/__\:::\    \       /:::/    \:::\    \       /:::/|::|   |            /:::/  \:::\    \    
   /::::\   \:::\    \     /:::/    / \:::\    \     /:::/ |::|   |           /:::/    \:::\    \   
  /::::::\   \:::\    \   /:::/____/   \:::\____\   /:::/  |::|   | _____    /:::/    / \:::\    \  
 /:::/\:::\   \:::\____\ |:::|    |     |:::|    | /:::/   |::|   |/\    \  /:::/    /   \:::\ ___\ 
/:::/  \:::\   \:::|    ||:::|____|     |:::|    |/:: /    |::|   /::\____\/:::/____/  ___\:::|    |
\::/    \:::\  /:::|____| \:::\    \   /:::/    / \::/    /|::|  /:::/    /\:::\    \ /\  /:::|____|
 \/_____/\:::\/:::/    /   \:::\    \ /:::/    /   \/____/ |::| /:::/    /  \:::\    /::\ \::/    / 
          \::::::/    /     \:::\    /:::/    /            |::|/:::/    /    \:::\   \:::\ \/____/  
           \::::/    /       \:::\__/:::/    /             |::::::/    /      \:::\   \:::\____\    
            \::/____/         \::::::::/    /              |:::::/    /        \:::\  /:::/    /    
             ~~                \::::::/    /               |::::/    /          \:::\/:::/    /     
                                \::::/    /                /:::/    /            \::::::/    /      
                                 \::/____/                /:::/    /              \::::/    /       
                                  ~~                      \::/    /                \::/____/        
                                                           \/____/                                  
                                                                                                    


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
titleCard.src = "/second/img/pong-game-title-screen.png";

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// draw image on canvas upon load
titleCard.onload = function () {
  ctx.drawImage(titleCard, 10, 10);
};

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

let lastPressedButton;

function keyPush(evt) {
  if (pongGameOn) {
    switch (evt.keyCode) {
      case 38: // UP
        playerPaddle.moveUp();
        break;
      case 40: // DOWN
        playerPaddle.moveDown();
        break;
      case 32: // SPACE
        stopPongGame();
        printDebug();
        break;
      default:
        // any other
        playerPaddle.stopVelocity();
        break;
    }
  }
}

/*
  _____          _     _ _         _____ _               
 |  __ \        | |   | | |       / ____| |              
 | |__) |_ _  __| | __| | | ___  | |    | | __ _ ___ ___ 
 |  ___/ _` |/ _` |/ _` | |/ _ \ | |    | |/ _` / __/ __|
 | |  | (_| | (_| | (_| | |  __/ | |____| | (_| \__ \__ \
 |_|   \__,_|\__,_|\__,_|_|\___|  \_____|_|\__,_|___/___/
                                                         
                                                                                                  
*/

let globalPaddleHeight = 20;
let initialYPaddlePosition = canvas.height / 2 - globalPaddleHeight;

class paddle {
  constructor(x) {
    this.x = x;
    this.y = initialYPaddlePosition;
    this.yPaddleVelocity = 0;
    this.paddleWidth = 4;
    this.paddleHeight = globalPaddleHeight;
    this.area = [];
  }

  // class methods
  moveUp() {
    this.yPaddleVelocity = -3;
  }

  moveDown() {
    this.yPaddleVelocity = 3;
  }

  stopVelocity() {
    this.yPaddleVelocity = 0;
  }

  updatePosition() {
    this.y += this.yPaddleVelocity;

    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > 380) {
      this.y = 380;
    }
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
  }

  initializeArea() {
    this.area.push({ x: this.x, y: this.y });
    while (this.area.length > this.height * this.width) {
      this.area.shift();
    }
  }
}

function generateXPaddlePosition() {}

/*


  ____        _ _    ____  _     _           _   
 |  _ \      | | |  / __ \| |   (_)         | |  
 | |_) | __ _| | | | |  | | |__  _  ___  ___| |_ 
 |  _ < / _` | | | | |  | | '_ \| |/ _ \/ __| __|
 | |_) | (_| | | | | |__| | |_) | |  __/ (__| |_ 
 |____/ \__,_|_|_|  \____/|_.__/| |\___|\___|\__|
                               _/ |              
                              |__/               


*/

let ball = {
  // TODO: add direction to determine how it bounces of edges
  ballXPosition: canvas.height / 2,
  ballYPosition: canvas.height / 2,
  ballXVelocity: -1,
  ballYVelocity: 1,
  ballSize: 10,
  area: [],
  moveLeft: function () {
    this.ballXVelocity = -1;
    this.ballYVelocity = 0;
  },
  moveRight: function () {
    this.ballXVelocity = 1;
    this.ballYVelocity = 0;
  },
  moveUp: function () {
    this.ballXVelocity = 0;
    this.ballYVelocity = -1;
  },
  moveDown: function () {
    this.ballXVelocity = 0;
    this.ballYVelocity = 1;
  },
  moveUpRight: function () {
    this.ballXVelocity = 1;
    this.ballYVelocity = -1;
  },
  moveDownRight: function () {
    this.ballXVelocity = 1;
    this.ballYVelocity = 1;
  },
  moveUpLeft: function () {
    this.ballXVelocity = -1;
    this.ballYVelocity = -1;
  },
  moveDownLeft: function () {
    this.ballXVelocity = -1;
    this.ballYVelocity = 1;
  },
  // TODO: add all diagonal directions
  draw: function () {
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.ballXPosition,
      this.ballYPosition,
      this.ballSize,
      this.ballSize
    );
  },
  updatePosition: function () {
    this.ballXPosition += this.ballXVelocity;
    this.ballYPosition += this.ballYVelocity;

    if (this.ballYPosition < 0) {
      this.ballYPosition = 0;
      this.ballYVelocity = 1;
    }
    if (this.ballYPosition > 390) {
      this.ballYPosition = 390;
      this.ballYVelocity = -1;
    }
  },
  initializeArea: function () {
    this.area.push({ x: this.ballXPosition, y: this.ballYPosition });
    while (this.area.length > this.ballSize * this.ballSize) {
      this.area.shift();
    }
  },
};

/*
  
  
    _____                     _____                      
   |  __ \                   / ____|                     
   | |__) |__  _ __   __ _  | |  __  __ _ _ __ ___   ___ 
   |  ___/ _ \| '_ \ / _` | | | |_ |/ _` | '_ ` _ \ / _ \
   | |  | (_) | | | | (_| | | |__| | (_| | | | | | |  __/
   |_|   \___/|_| |_|\__, |  \_____|\__,_|_| |_| |_|\___|
                      __/ |                              
                     |___/                               
  
  
  */

let pongGameInterval = false;
let pongGameOn = false;

let playerScore = 0;
let npcScore = 0;

let playerPaddle;
let npcPaddle;

// Array to hold paddles
let paddles = new Array();

let npcYPlacement = 0 + canvas.height * 0.1;
let playerYPlacement = canvas.height - canvas.height * 0.1;

const gameTitle = document.getElementById("title");
const startGameButton = document.getElementById("playbutton");

const playerScoreInput = document.getElementById("playerScore");
const npcScoreInput = document.getElementById("npcScore");

function initializePaddles() {
  playerPaddle = new paddle(playerYPlacement);
  npcPaddle = new paddle(npcYPlacement);
  paddles.push(playerPaddle);
  paddles.push(npcPaddle);
}

function checkForCollision(inputBall, leftPaddle, rightPaddle) {
  // check for npc paddle
  for (let i = 0; i < leftPaddle.area.length; i++) {
    for (let j = 0; j < inputBall.area.length; j++) {
      if (
        leftPaddle.area[i].x === inputBall.area[j].x &&
        leftPaddle.area[i].y === inputBall.area[j].y
      ) {
        inputBall.ballXVelocity = 1;
      }
    }
  }

  // check for player paddle
  for (let i = 0; i < rightPaddle.area.length; i++) {
    for (let j = 0; j < inputBall.area.length; j++) {
      if (
        rightPaddle.area[i].x === inputBall.area[j].x + inputBall.ballSize &&
        rightPaddle.area[i].y === inputBall.area[j].y + inputBall.ballSize
      ) {
        // console.log(rightPaddle.area);
        // console.log(inputBall.area);
        // console.log(
        //   rightPaddle.area[i].x +
        //     ", " +
        //     inputBall.area[j].x +
        //     ", " +
        //     inputBall.ballSize +
        //     ", " +
        //     rightPaddle.area[i].y +
        //     ", " +
        //     inputBall.area[j].y +
        //     ", " +
        //     inputBall.ballSize
        // );
        inputBall.ballXVelocity = -1;
      }
    }
  }
}

function checkForPointWin(inputBall) {
  if (inputBall.ballXPosition < 0 - inputBall.ballSize) {
    playerScore++;
    resetBallPosition();
  }

  if (inputBall.ballXPosition > canvas.width + inputBall.ballSize) {
    npcScore++;
    resetBallPosition();
    printDebug();
  }
}

function resetBallPosition() {
  ball.ballXPosition = canvas.height / 2;
  ball.ballYPosition = canvas.height / 2;
  ball.ballXVelocity = generateRandomVelocity();
  ball.ballYVelocity = generateRandomVelocity();
}

function generateRandomVelocity() {
  switch (Math.round(Math.random())) {
    case 0:
      return -1;
    case 1:
      return 1;
  }
}

function updateHTMLScores() {
  playerScoreInput.textContent = "player Score: " + playerScore;
  playerScoreInput.value = playerScore;
  npcScoreInput.textContent = "NPC Score: " + npcScore;
  npcScoreInput.value = npcScore;
}

function startPongGame() {
  initializePaddles();

  pongGameOn = true;
  startInterval();
  startGameButton.onclick = resetGame;
  gameTitle.textContent = "Pong";
}

function stopPongGame() {
  stopInterval();
  // reset score
}

function startInterval() {
  pongGameOn = true;
  pongGameInterval = setInterval(gamePong, 1000 / 50);
}

function stopInterval() {
  pongGameOn = false;
  clearInterval(pongGameInterval);
}

function moveNPCPaddle() {
  // TODO: make this based on ball position
  //   let input = Math.round(Math.random());
  //   switch (input) {
  //     case 0:
  //       npcPaddle.moveUp();
  //       break;
  //     case 1:
  //       npcPaddle.moveDown();
  //       break;
  //   }
  npcPaddle.y = ball.ballYPosition;
}

function updatePaddlePositions(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].updatePosition();
  }
}

function drawPaddles(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].draw();
  }
}

function resetVelocity(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].yPaddleVelocity = 0;
  }
}

function initializeAreas(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].initializeArea();
  }
}

// TODO: for debugging only
function printDebug() {
  console.log(paddles);
  console.log(ball);
}

// TODO: finish this function
function resetGame() {
  stopPongGame();

  // reset positions

  // reset scores

  // start game again
}

// MAIN FUNCTION
function gamePong() {
  /*
    1. update paddle positions

    2. update ball position

    3. draw background

    4. draw paddles

    5. check if ball and paddle overlap

    6. draw ball

    7. update score
  */

  // 1.
  moveNPCPaddle();

  updatePaddlePositions(paddles);

  // 2.
  ball.updatePosition();

  // 3.
  drawBackground();

  // 4.
  drawPaddles(paddles);

  playerPaddle.stopVelocity();
  npcPaddle.stopVelocity();

  // 5.
  // initialize areas:
  initializeAreas(paddles);
  ball.initializeArea();
  // TODO: define this function to check the two positions
  checkForCollision(ball, npcPaddle, playerPaddle);

  checkForPointWin(ball);

  // 6.
  ball.draw();
}
