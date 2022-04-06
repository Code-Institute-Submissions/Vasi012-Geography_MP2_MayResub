import {
    quizQuestionsDataBase
} from "../js/questionaire.js";
//game instructions help
//get the modal
var modal = document.getElementById("gameHelp");
//get the button that opens the modal
var btn = document.getElementById("gameInstructions");
//get span element that close the modal
var span = document.getElementsByClassName("close")[0];
//when clicked open the modal
btn.onclick = function () {
    modal.style.display = "block";
};
//when clicked on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
//when clicked outside modal, close the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Qestions array
var quizQuestions = quizQuestionsDataBase;
const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);
var selectedValue = null;
let correctAnswerScore = 0;
let incorrectAnswerScore = 0;
let shuffledQuestions, currentQuestionIndexNumber;
//Start game
function startGame(event) {
    console.log("started");
    startButton.classList.add("hide");
    document.getElementById("question").classList.remove("hide");
    shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndexNumber = 0;
    document.getElementById("answer-buttons").classList.remove("hide");
    setNextQuestion();
    displayQuestion();
}
//display next question
function displayNextQuestion(event) {
    document.getElementById("next-btn").classList.add("hide");
    document.getElementById("submit-btn").classList.remove("hide");
    displayQuestion();
}
//set next question - calls function above and pulls the questions out from the shuffled questions list
function setNextQuestion() {
    displayNextQuestion(shuffledQuestions[currentQuestionIndexNumber]);
}
//keep the track of question number
function questionTracker(event) {
    currentQuestionIndexNumber += 1;
    let nextQuestBtn = document.getElementById("next-btn");
    if (currentQuestionIndexNumber == 10) {
        nextQuestBtn.innerHTML = "Show Results";
    }
}
//display question
function displayQuestion() {
    let theQ = document.getElementById("question"); //display the question
    theQ.innerHTML = shuffledQuestions[currentQuestionIndexNumber].question;
    let questionNumber = document.getElementById("question-number"); // display question number
    questionNumber.innerHTML = currentQuestionIndexNumber + 1;
    let a = document.getElementsByClassName("btn")[0];
    a.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[0].answer;
    let b = document.getElementsByClassName("btn")[1];
    b.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[1].answer;
    let c = document.getElementsByClassName("btn")[2];
    c.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[2].answer;
    let d = document.getElementsByClassName("btn")[3];
    d.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[3].answer;
}

//click and toggle the answers buttons
function answerSelected(event) {
    selectedValue = this.innerHTML;
}
//selected answer is highlithed
function answerHighlighted(event) {
    this.style.backgroundColor = "teal";
}
//reset all the background buttons color
function resetBackgroundColor(event) {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "darkseablue";
    }
}
//event listners to the selected answer on onclicks
let buttons = document.getElementsByClassName("btn");
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i].addEventListener("click", resetBackgroundColor);
    button = buttons[i].addEventListener("click", answerHighlighted);
    button = buttons[i].addEventListener("click", answerSelected);
}
//check if the answer is correct
function checkAnswer(event) {
    let buttons = document.getElementsByClassName("btn");
    if (selectedValue === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === selectedValue) {
                buttons[i].style.backgroundColor = "green";
            }
        }
    } else if (selectedValue !== shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === selectedValue) {
                buttons[i].style.backgroundColor = "crimson";
            } else if (buttons[i].textContent === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
                buttons[i].style.backgroundColor = "green";
            }
        }
    }
}
//score counter
function countScore(event) {
    if (selectedValue === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        correctAnswerScore += 1;
    } else {
        incorrectAnswerScore += 1;
    }
}
//creeate variable of the submitAnswers and nextQuestions button
let submitAnsBtn = document.getElementById("submit-btn");
let nextQuestBtn = document.getElementById("next-btn");
//submit answer & next question button
function nextQuestionsButtonDisplay(event) {
    document.getElementById("next-btn").classList.remove("hide");
    document.getElementById("submit-btn").classList.add("hide");
}
//submit answer
function submitAnswer(event) {
    if (selectedValue == null) {
        return alert("Please select an answer");
    } else if (selectedValue != null) {
        checkAnswer();
        countScore();
        nextQuestionsButtonDisplay();
        questionTracker();
    }
}
submitAnsBtn.addEventListener("click", submitAnswer);
/**
 * This finction will return the results
 * when the test its finish.
 *
 */
function returnResults() {
    let totalScore = correctAnswerScore + incorrectAnswerScore;
    if (totalScore === 10) {
        document.getElementById("question").classList.add("hide");
        document.getElementById("answer-buttons").classList.add("hide");
        document.getElementById("next-btn").classList.add("hide");
        document.getElementById("submit-btn").classList.add("hide");
        document.getElementById("result-box").classList.remove("hide");
    }
    //variable of userScore
    let userScore = document.getElementById("user-score");
    userScore.innerHTML = correctAnswerScore;
    let personalMessage = document.getElementById("personal-message");
    if (correctAnswerScore == 0) {
        personalMessage.innerHTML = "Opps...Looks like you have to learn some geography... Try again!";
    } else if (correctAnswerScore < 3) {
        personalMessage.innerHTML = "Not to bad, but i'm sure you can do better next time!";
    } else if (correctAnswerScore < 6) {
        personalMessage.innerHTML = "Well, it's better then nothing :), try again!";
    } else if (corectAnswerScore < 9) {
        personalMessage.innerHTML = "Wow you are amazing, try again and get 10/10, let see if you can!";
    } else if (corectAnswerScore == 10) {
        personalMessage.innerHTML = "WOW 10/10 YOU ARE AWESOME. Ladies and gentalman's THE WINNER!";
    }
}
//displany Next QUestion
nextQuestBtn.addEventListener("click", displayNextQuestion);
nextQuestBtn.addEventListener("click", resetBackgroundColor);
nextQuestBtn.addEventListener("click", returnResults);
/**
 * This function will reset the game values
 * all the values will become now 0.
 */
function resetGameValues() {
    currentQuestionIndexNumber = 1;
    correctAnswerScore = 0;
    incorrectAnswerScore = 0;
    document.getElementById("submit-btn").classList.remove("hide");
    document.getElementById("result-box").classList.add("hide");
    document.getElementById("next-btn").innerHTML = "Next Question";
}
//start a new game
let startNewGameBtn = document.getElementById("start-new-game-btn");
startNewGameBtn.addEventListener("click", resetGameValues);
startNewGameBtn.addEventListener("click", startGame);