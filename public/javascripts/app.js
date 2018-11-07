// Cached DOM elements
var timerPage;
var countdown;
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
var wrongPage;
var correctPage;
var timeupPage;
// Audio variables
var gulpAudio = new Audio("../audio/gulp.wav");
// var incorrectAudio = new Audio("");
// var correctAudio = new Audio("");
// var countdownAudio = new Audio("");
var explosionAudio = new Audio("../audio/explosion.mp3");
var tickingAudio = new Audio("../audio/ticking.wav")

// DOM elements retreived in page load event
document.addEventListener("DOMContentLoaded", function (e) {
    countdown = document.getElementById('countdown');
    question = document.getElementById('questions');
    ans0 = document.getElementById('ans0');
    ans1 = document.getElementById('ans1');
    ans2 = document.getElementById('ans2');
    ans3 = document.getElementById('ans3');
    wrongPage = document.getElementById('wrong-page');
    correctPage = document.getElementById('correct-page');
    timerPage = document.getElementById('timer-page');
    timeupPage = document.getElementById('timeup-page');
    ans0.addEventListener('click', checkAnswer);
    ans1.addEventListener('click', checkAnswer);
    ans2.addEventListener('click', checkAnswer);
    ans3.addEventListener('click', checkAnswer);

    // Event listeners
    function generateQuestion() {
        fetch(`/api/newQuestion/${gameId}`)
            .then(response => response.json())
            .then(json => renderQuestion(json));
    }

    function incorrectAnswer() {
        fetch(`/api/incorrectAnswer/${gameId}`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(question => console.log(question));
    }

    // Functions
    function firstCountdown() {
        timerPage.style.display = 'block';
        timer = 4;
        var countInterval = setInterval(function () {
            timer--;
            countdown.innerHTML = timer;
            if (timer === 0) {
                clearInterval(countInterval);
                timerPage.style.display = 'none'
                renderGame();
            }
        }, 1000);
    }
    function renderGame() {
        timeRemaining = randomNumber(10, 15);
        beginCountdown();
        generateQuestion();
    }

    function beginCountdown() {
        gameStart = setInterval(function () {
            tickingAudio.play();
            timeRemaining--;
            console.log(timeRemaining)
            if (timeRemaining === 0) {
                console.log('GAME OVER');
                clearInterval(gameStart);
                gameOver();
            }
        }, 1000);
    }

    function decodeHTML(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

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

        if (q.results[0].question.length > 140) {
            question.style.fontSize = '225%';
        }

        question.innerHTML = q.results[0].question;

        if (q.results[0].incorrect_answers.length > 2) {
            var shuffledAnswers = shuffleArray(answersArr);
            ans0.innerHTML = shuffledAnswers[0];
            ans1.innerHTML = shuffledAnswers[1];
            ans2.innerHTML = shuffledAnswers[2];
            ans3.innerHTML = shuffledAnswers[3];
        } else if (q.results[0].incorrect_answers.length <= 2) {
            var shuffledAnswers = shuffleArray([q.results[0].correct_answer, q.results[0].incorrect_answers[0]])
            ans0.innerHTML = shuffledAnswers[0];
            ans1.innerHTML = shuffledAnswers[1];
            ans2.innerHTML = '';
            ans3.innerHTML = '';
        }
        correctAnswer = q.results[0].correct_answer;
        console.log(correctAnswer);
    }

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
        var decodedCorrectAnswer = decodeHTML(correctAnswer);
        console.log(decodedCorrectAnswer);
        if (e.target.innerHTML === decodedCorrectAnswer) {
            renderCorrectPage();
            nextQuestion();
        } else {
            e.target.innerHTML = '';
            renderWrongPage();
            incorrectAnswer();
        }
    }

    function nextQuestion() {
        generateQuestion(function () {
            renderQuestion();
        });
    }

    function gameOver() {
        explosionAudio.play();
        setTimeout(function () {
            window.location.href = `/gameover/${gameId}`;
        }, 2000);
    }

    function renderWrongPage() {
        wrongPage.style.display = 'block';
        setTimeout(function () {
            wrongPage.style.display = 'none';
        }, 3000);
    }

    function renderCorrectPage() {
        correctPage.style.display = 'block';
        setTimeout(function () {
            correctPage.style.display = 'none';
        }, 1000);
    }

    firstCountdown();
});
