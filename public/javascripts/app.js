// Cached DOM elements
var question;
var ans1;
var ans2;
var ans3;
var ans4;
var genQ;
var correctAnswer;
var answerButtons;

// Event listeners

function generateQuestion() {
    fetch('https://opentdb.com/api.php?amount=1&category=9')
    .then(response => response.json())
    .then(json => renderQuestion(json));
}

answerButtons.addEventListener('click', checkAnswer);

// Functions
function renderQuestion(q) {
    correctAnswer = q.results[0].correct_answer;
    console.log(correctAnswer);
    
    var answersArr = [
        q.results[0].correct_answer,
        q.results[0].incorrect_answers[0],
        q.results[0].incorrect_answers[1],
        q.results[0].incorrect_answers[2]
    ];
    
    var shuffledAnswers = shuffleArray(answersArr);
    
    question.innerHTML = q.results[0].question;      
    ans1.innerHTML = shuffledAnswers[0];
    ans2.innerHTML = shuffledAnswers[1];
    ans3.innerHTML = shuffledAnswers[2];
    ans4.innerHTML = shuffledAnswers[3];
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
    if (e.target.innerHTML === correctAnswer);
    console.log('Correct!');
}
    
// DOM elements retreived in page load event
document.addEventListener("DOMContentLoaded", function(e) {
    question = document.getElementById('questions');
    ans1 = document.getElementById('ans1');
    ans2 = document.getElementById('ans2');
    ans3 = document.getElementById('ans3');
    ans4 = document.getElementById('ans4');
    getQ = document.getElementById('genQ'); // This can be removed after TimeIntervals are placed.
    answerButtons = document.querySelectorAll(".answerButtons");
});
