score = 0;
cross = true;
audiogo = new Audio('gameover.mp3');
document.onkeydown = function(e){
    console.log("Key Code is : ",e.keyCode);
    if(e.keyCode == 38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(function(){
            dino.classList.remove('animateDino');
        },700);
    }
    if(e.keyCode == 32){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(function(){
            dino.classList.remove('animateDino');
        },700);
    }
    // giving the function to rightArrow key
    if(e.keyCode == 39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left =( dinoX + 112 )+ 'px';
    }
    
    if(e.keyCode == 37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left =( dinoX - 112 )+ 'px';
    }

}

// to detect the collision of dino and dragon
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle  = document.querySelector('.obstacle');
    
    // fetching the data of positions of dion and dragon

    // dino co ordinates
dx = parseInt( window.getComputedStyle(dino,null).getPropertyValue('left'));
dy = parseInt(  window.getComputedStyle(dino,null).getPropertyValue('top'));

// dragon co ordinates
ox = parseInt( window.getComputedStyle(obstacle,null).getPropertyValue('left'));
oy = parseInt( window.getComputedStyle(obstacle,null).getPropertyValue('top'));

// determine the distance b/w dino and dragon
offsetX = Math.abs(dx-ox);
offsetY = Math.abs(dy-oy);
console.log(offsetX,offsetY);

if(offsetX < 73 && offsetY < 52){
    gameOver.innerHTML = '  Game Over 🧨  -Reload to Restart the Game 🏁 '
    gameOver.style.visibility = 'visible';
    obstacle.classList.remove('obstacleAni');
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
    }, 1000);
}
else if(offsetX < 145 &&  cross){
    score = score + 1;
    updateScore(score);
    cross = false;
    // again to update the score
    setTimeout(() => {
        cross = true;
    }, 1000);
    // to increase the animation duration to get better experience
    setTimeout(() => {
        aniDur = parseInt( window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.01;
        obstacle.style.animationDuration = newDur + 's';

    }, 500);
}

// console.log('error');
}, 10);

// updating the score
function updateScore(){
    scoreCont.innerHTML = 'Your Score :' + score;
}