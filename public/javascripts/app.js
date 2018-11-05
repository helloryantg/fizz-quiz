// Cached DOM elements
var firstTimer;
var timer;
var timeRemaining;
var gameStart;
var question;
var ans0;
var ans1;
var ans2;
var ans3;
var genQ;
var correctAnswer;

var animalsCategory;

var allQuestions;


// Event listeners
renderGame();

function generateQuestion(e) {
    fetch(`https://opentdb.com/api.php?amount=40&category=${catId}`)
    .then(response => response.json())
    .then(json => renderQuestion(json));   
}

// Functions
function renderGame() {
    // set gameover and timer displays to none
    firstTimerCountdown();
}

function firstTimerCountdown() {
    firstTimer = 3;
    timer = setInterval(function() {
        firstTimer--;
        console.log(firstTimer);
        if (firstTimer === 0) {
            console.log('BEGIN GAME');
            clearInterval(timer);
            beginCountdown();
            // remove timer page
        }
    }, 1000);
}

function beginCountdown() {
    timeRemaining = randomNumber(5,10);
    gameStart = setInterval(function() {
        timeRemaining--;
        console.log(timeRemaining)
        if (timeRemaining === 0) {
            console.log('GAME OVER');
            clearInterval(gameStart);
            gameOver();
        }
    }, 1000);
}

// Randomizes number between min and max numbers
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

// Places correct answer and wrong answers inside an array and shuffles them. Also renders them onto the page
function renderQuestion(q) {
    var answersArr = [
        q.results[0].correct_answer,
        q.results[0].incorrect_answers[0],
        q.results[0].incorrect_answers[1],
        q.results[0].incorrect_answers[2]
    ];

    var shuffledAnswers = shuffleArray(answersArr);    
    correctAnswer = q.results[0].correct_answer;
    console.log(correctAnswer);
    
    question.innerHTML = q.results[0].question;      
    ans0.innerHTML = shuffledAnswers[0];
    ans1.innerHTML = shuffledAnswers[1];
    ans2.innerHTML = shuffledAnswers[2];
    ans3.innerHTML = shuffledAnswers[3];
    
    if (shuffledAnswers[0] === undefined) {
        ans0.innerHTML = '';
    }
    if (shuffledAnswers[1] === undefined) {
        ans1.innerHTML = '';
    }
    if (shuffledAnswers[2] === undefined) {
        ans2.innerHTML = '';
    }
    if (shuffledAnswers[3] === undefined) {
        ans3.innerHTML = '';
    }
}

// Shuffles the array
function shuffleArray(arr) {
    var newArr = arr;
    var currentIndex = newArr.length;
    var tempValue;
    var randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = newArr[currentIndex];
        newArr[currentIndex] = newArr[randomIndex];
        newArr[randomIndex] = tempValue;
    }
    return newArr;
}

// Checks the answer for when the event listener is clicked
function checkAnswer(e) {
    if (e.target.innerHTML === correctAnswer) {
        // This is not accepting the innerHTML
        console.log('Correct!');
        nextQuestion();
    } else {
        console.log('Try again!');
    }
}

// Goes to the next question
function nextQuestion() {
    generateQuestion(function () {
        renderQuestion();
    });
}

function gameOver() {
    // gameoverContainer.style.display = 'block';
}
    
// DOM elements retreived in page load event
document.addEventListener("DOMContentLoaded", function (e) {
    firstTimer = document.getElementById('first-timer');
    question = document.getElementById('questions');
    
    // gameoverContainer = document.getElementById('gameover-container');
    
    ans0 = document.getElementById('ans0');
    ans1 = document.getElementById('ans1');
    ans2 = document.getElementById('ans2');
    ans3 = document.getElementById('ans3');
    getQ = document.getElementById('genQ'); // This can be removed after TimeIntervals are placed.

    ans0.addEventListener('click', checkAnswer);
    ans1.addEventListener('click', checkAnswer);
    ans2.addEventListener('click', checkAnswer);
    ans3.addEventListener('click', checkAnswer);

    animalsCategory = document.getElementById('animals');
});
