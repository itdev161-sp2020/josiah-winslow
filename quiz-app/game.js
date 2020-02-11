const $id = function(id) {
	return document.getElementById(id);
}

const $q = function(sel) {
	return document.querySelector(sel);
}

const $qall = function(sel) {
	return [...document.querySelectorAll(sel)];
}

const question = $id("question");
const choices = $qall(".choice-text");
const progressText = $id("progress-text");
const scoreText = $id("score");
const progressBarFull = $id("progress-bar-full");
const loader = $id("loader");
const game = $id("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res => res.json())
.then(loadedQuestions => {
	questions = loadedQuestions.results.map(loadedQuestion => {
		const formattedQuestion = {
			question: loadedQuestion.question
		};
		
		const answerChoices = [...loadedQuestion.incorrect_answers];
		formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
		answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
		
		answerChoices.forEach((choice, index) => {
			formattedQuestion["choice" + (index + 1)] = choice;
		});
		
		return formattedQuestion;
	});
	
	loader.classList.add("hidden");
	
	startGame();
	
	game.classList.remove("hidden");
})
.catch(err => {
	console.err(err);
});

// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

function startGame() {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
}

function getNewQuestion() {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
	{
		localStorage.setItem("mostRecentScore", score);
		
		// Go to the end page
		return window.location.assign("end.html");
	}
	
	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
	
	// Update the progress bar
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerHTML = currentQuestion.question;
	
	choices.forEach(choice => {
		const number = choice.dataset["number"];
		choice.innerHTML = currentQuestion["choice" + number];
	});
	
	availableQuestions.splice(questionIndex, 1);
	
	acceptingAnswers = true;
}

choices.forEach(choice => {
	choice.addEventListener("click", e => {
		if (!acceptingAnswers) return;
		
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		selectedChoice.parentElement.classList.add(classToApply);
		if (classToApply === "correct")
		{
			incrementScore(CORRECT_BONUS);
		}
		
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

function incrementScore(num) {
	score += num;
	scoreText.innerText = score;
}