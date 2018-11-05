// Cached DOM elements
var timeRemaining;
var gameStart;
var question;
var ans0;
var ans1;
var ans2;
var ans3;
var genQ;
var correctAnswer;

// Event listeners
// beginCountdown();

function generateQuestion() {
    fetch('https://opentdb.com/api.php?amount=1&category=9')
    .then(response => response.json())
    .then(json => renderQuestion(json));
}

// Functions
function beginCountdown() {
    timeRemaining = randomNumber(15, 180);
    gameStart = setInterval(function() {
        countDown();
        console.log(timeRemaining)
        if (timeRemaining === 0) {
            console.log('GAME OVER');
            stopInterval();
        }
    }, 1000);
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

function countDown() {
    timeRemaining--;
}

function stopInterval() {
    clearInterval(gameStart);
}

function renderQuestion(q) {
    var answersArr = [
        q.results[0].correct_answer,
        q.results[0].incorrect_answers[0],
        q.results[0].incorrect_answers[1],
        q.results[0].incorrect_answers[2]
    ];
    
    var shuffledAnswers = shuffleArray(answersArr);
    
    question.innerHTML = q.results[0].question;      
    ans0.innerHTML = shuffledAnswers[0];
    ans1.innerHTML = shuffledAnswers[1];
    ans2.innerHTML = shuffledAnswers[2];
    ans3.innerHTML = shuffledAnswers[3];

    correctAnswer = q.results[0].correct_answer;
    console.log(correctAnswer);
    changedAnswer = correctAnswer.toString();
    console.log(changedAnswer);
}
    
function shuffleArray(arr) {
    var newArr = [].concat(arr);
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
    
function checkAnswer(e) {
    if (e.target.innerHTML === correctAnswer) {
        // This is not accepting the innerHTML
        console.log('Correct!');
        nextQuestion();
    } else {
        console.log('Try again!');
    }
}

function nextQuestion() {
    generateQuestion(function(){
        renderQuestion();
    });
}
    
// DOM elements retreived in page load event
document.addEventListener("DOMContentLoaded", function(e) {
    question = document.getElementById('questions');
    ans0 = document.getElementById('ans0');
    ans1 = document.getElementById('ans1');
    ans2 = document.getElementById('ans2');
    ans3 = document.getElementById('ans3');
    getQ = document.getElementById('genQ'); // This can be removed after TimeIntervals are placed.

    ans0.addEventListener('click', checkAnswer);
    ans1.addEventListener('click', checkAnswer);
    ans2.addEventListener('click', checkAnswer);
    ans3.addEventListener('click', checkAnswer);
});
