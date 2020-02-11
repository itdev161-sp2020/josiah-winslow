const $id = function(id) {
	return document.getElementById(id);
}

const $q = function(sel) {
	return document.querySelector(sel);
}

const $qall = function(sel) {
	return [...document.querySelectorAll(sel)];
}

const username = $id("username");
const saveScoreBtn = $id("save-score-button");
const finalScore = $id("final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
	saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
	e.preventDefault();
	
	const score = {
		score: mostRecentScore,
		name: username.value
	};
	
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score);
	highScores.splice(5);
	
	localStorage.setItem("highScores", JSON.stringify(highScores));
	window.location.assign("index.html");
}