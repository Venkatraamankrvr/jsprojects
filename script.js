const canvas = document.getElementById("myCanvas");
// get context property to get canvas all property 1.
const ctx = canvas.getContext("2d");
console.log(ctx);
// defining radius of ball 2.
const ballRadius = 10;
// clearing the ball path by using below variables,clearing the whole window 9.
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var x = canvas.width / 2;
var y = canvas.height - 30;
// speed in X-direction,minute increment in x dir 10.
var dx = 2;
// speed in Y-direction,increment in y dir 11.
var dy = 2;
const numberOfBricks = 30;
let activeBricks = numberOfBricks;
// no of bricks in top 21.
let numberOfColumns = 5;
let numberOfRows = 3;
// making of brick 20.
let bricks = [];
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// for paddle 14.
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var scoreContainer = document.getElementById("score");
scoreContainer.innerText = "Score :- 0";

// updating the game score 36.
function updateScore() {
  const score = getScore();

  scoreContainer.innerText = `Score :- ${score}`;
  if (score === numberOfColumns * numberOfRows) {
    alert("Congratulations you won the game");
    window.location.reload();
    clearInterval(interval);
  }
}
// getting the total score 35.
function getScore() {
  var score = 0;
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      if (bricks[r][c].status === 0) score++;
    }
  }

  return score;
}
// generating bricks 22.
function generateAllBricks() {
  for (var r = 0; r < numberOfRows; r++) {
    bricks[r] = [];
    for (var c = 0; c < numberOfColumns; c++) {
      bricks[r][c] = { x: r, y: c, status: 1 }; //status 1 means brick is alive
    }
  }
  console.log(bricks);
}

// drawing all bricks 24.
function drawAllBricks() {
  //this will draw all bricks in our canvas
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      // making the brick path ,store in variable 25.
      var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      if (!bricks[r][c]) bricks[r][c] = { x: brickX, y: brickY };
      else {
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
      }
      // if brick is alive,it was to print it.   26.
      if (bricks[r][c].status) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// check boundary collision 13.
function checkBoundaryHit() {
  if (x + dx + ballRadius >= canvasWidth || x + dx <= ballRadius) dx = -dx;
  // check if the ball is range of paddle or not 33.
  if (y + dy <= ballRadius) dy = -dy;
  else if (y + dy > canvasHeight - ballRadius) {
    //check for paddle bounce
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else handleGameOver();
  }
}
// making the game over function 34.
function handleGameOver() {
  alert("Game over, your score is " + getScore());
  updateScore();
  window.location.reload();
  clearInterval(interval);
}
// ball v/s bricks collision detection 28.
function collisionDetection() {
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      // got a single brick 29.
      var b = bricks[r][c];
      // this brick must be alive 30.


      //check if ball in a rang of brick
      if (
        y <= b.y + brickHeight &&
        y >= b.y &&
        x >= b.x &&
        x <= b.x + brickWidth &&
        b.status === 1
      ) {
        dy = -dy;
        b.status = 0;
        updateScore();
        //delete bricks[r][c];
      }
    }
  }
}
// making the ball move 6.
function draw() {
  ctx.beginPath();
  // to clr the path of moving ball 8.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // creating the ball  3.
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  // coloring the ball 4.
  ctx.fillStyle = "#0095D";
  // filled the color 5.
  ctx.fill();
  ctx.closePath();
  checkBoundaryHit();
  // incresing the values 12.
  x += dx;
  y += dy;
  // drawing the bricks 27.
  drawAllBricks();
  // when the ball starts to move the paddle was to create 17.
  drawPaddle();
  // calling collision detection 31.
  collisionDetection();
}
// drawing the paddle 15.
function drawPaddle() {
  ctx.beginPath();
  // rect propety to draw rectangle 16.
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
// calling generatebrick function 23.
generateAllBricks();
drawAllBricks();
// changin the position of ball for every 20ms 7.
const interval = setInterval(draw, 20);
// making the paddle to move 18.
window.onkeydown = (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    if (paddleX + 10 + paddleWidth <= canvasWidth) paddleX = paddleX + 10;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    if (paddleX - 10 >= 0) paddleX = paddleX - 10;
  }
};
