let inputDir = { x: 0, y: 0 };

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
  {
    x:13,y:15
  }
]
food = {x:6,y:7};

//  instead of set time out we use this to improve our animations(getting the higher fps)
window.requestAnimationFrame(main);
// to control the fps
function main (ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1 / speed){
    // if the speed is less than 0,5 sec
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// collide function
function isCollide(snake){
  // if snake bumps inti itself
  // for(let index = 1; index < snakeArr.length; i++){
  //   console.log('error');
  //   if ( snake[index].x === snake[0].x && snake[index].y === snake[0].y){
  //     // return true;
  //   }
  // }
  for (let index = 1; index < snakeArr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  }
  // if snake collides with boundaruy of board
  if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
  }
  return false;
}
function gameEngine(){
  // 1.updating the snake array and food
if(isCollide(snakeArr)){
  gameOverSound.play();
  inputDir = {x:0,y:0};
  alert('GameOver,Press any key to play again');
  snakeArr = [{x:13,y:15}];
  score = 0;
  scoreBox.innerHTML = 'score :' + 0;
}

  // if snake is eaten the food,increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
   
    foodSound.play();
    score= score+1;
    if(score>hiScoreVal){
      hiScoreVal = score ;
      console.log(hiScoreVal);
      localStorage.setItem('hiScoress',JSON.stringify(hiScoreVal));
      hiscoreBox.innerHTML = 'HiScore: ' + hiScoreVal;
    }
    scoreBox.innerHTML = "Score :" + score;
    snakeArr.unshift({ x:snakeArr[0].x+inputDir.x,  y:snakeArr[0].y+inputDir.y})
    let a = 2;
    let b = 16;
    food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round( a + (b-a)*Math.random())}
  }

//   Moving the snake
for(let i = snakeArr.length - 2;i >=0 ; i--)
{
  // by incresoing the index of each tile of snake ahead of one,it is moving
  snakeArr[i+1] = {...snakeArr[i]};
}
musicSound.play();
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y; 

  // 2.display the snake and food
  board.innerHTML = '';
  snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement("div");
    // head is not stationary so store it in event.
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index == 0){
      
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('snake');

    }
    board.appendChild(snakeElement);

  });
  // dislaying the food

foodElement = document.createElement("div");
    // head is not stationary so store it in event.
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    
    foodElement.classList.add('food');

    board.appendChild(foodElement);
}


// main logic starts here

// setting the highscore in localstorage
// let hiScore = localStorage.getItem('hiScoress');
// if (hiScore === null){
//   hiScoreVal = 0;
//   // localStorage.setItem('hiScoress',JSON.stringify(hiScoreVal));
//   console.log(hiScore);
// }
// else{
//   hiScoreVal = JSON.parse(hiScore);
//   console.log(hiScoreVal);
//   hiscoreBox.innerHTML = 'HiScore: ' + hiScoreVal;
// }
let hiScore = localStorage.getItem("hiScoress");
console.log(hiScore);
if (hiScore === null) {
  hiScoreVal = 0;
  localStorage.setItem("hiScoress", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiScore);
  console.log(hiScoreVal);
  hiscoreBox.innerHTML = "HiScore: " + hiScoreVal;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
  inputDir = { x:0,y:1};
  moveSound.play();
  switch(e.key){
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      
      
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      
        break;
        
     case 'ArrowRight':
      inputDir.x = 1;
      inputDir.y = 0;
      
        break;
      case 'ArrowLeft':
        inputDir.x = -1;
        inputDir.y = 0;
        break;
        
      }
})
// localStorage.clear();