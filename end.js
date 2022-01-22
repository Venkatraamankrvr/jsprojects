// variables
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');


// CHECKING THE HIGHSCORE
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// MAXIMUM SCORE
const MAX_HIGH_SCORES = 5;

// DISPLAY HIGHD=SCORE IN UI
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  // to remove the disabled class
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  e.preventDefault();
// receiving the input names
  const score = {
      score: mostRecentScore,
      name: username.value
  }
// list of high scores
  highScores.push(score);
// to arrange the leaderboard
  highScores.sort((a, b) => {
      return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('index.html');
}

