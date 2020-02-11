const $id = function(id) {
	return document.getElementById(id);
}

const $q = function(sel) {
	return document.querySelector(sel);
}

const $qall = function(sel) {
	return [...document.querySelectorAll(sel)];
}

const highScoresList = $id("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map(score => {
	return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");