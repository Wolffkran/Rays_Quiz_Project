// Define your quiz questions and answers
const questions = [
  {
    question: "What does 'HTML' stand for?",
    options: ["Hyper Text Markup Language", "Highly Textual Marking Language", "Hyperlink and Text Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["React", "jQuery", "Bootstrap"],
    correctAnswer: "React"
  },
  {
    question: "What is the purpose of CSS?",
    options: ["To add interactivity to a website", "To define the structure of a web page", "To style the appearance of a web page"],
    correctAnswer: "To style the appearance of a web page"
  }
];


// Initialize variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionTextElement = document.getElementById("question-text");
const optionsListElement = document.getElementById("options-list");
const timerElement = document.getElementById("time-left");
const gameOverContainer = document.getElementById("game-over-container");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highScoreContainer = document.getElementById("high-score-container");
const highScoreList = document.getElementById("high-score-list");
const resetScoreboardButton = document.getElementById("reset-scoreboard");
const goBackButton = document.getElementById("go-back-button");

// Event listeners
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
resetScoreboardButton.addEventListener("click", resetScoreboard);
submitScoreButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const newHighScore = { initials, score };
    const existingHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
    existingHighScores.push(newHighScore);
    localStorage.setItem("highScores", JSON.stringify(existingHighScores));
    displayHighScores();
    alert("Score submitted!");
  } else {
    alert("Please enter your initials.");
  }
});
goBackButton.addEventListener("click", () => {
  resetQuiz(); // Create a function to reset the quiz
  window.location.href = "index.html"; 
});

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none"; 
  displayQuestion(currentQuestionIndex); 
  timerInterval = setInterval(function () {
    updateTimer();
    if (currentQuestionIndex >= questions.length || timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function displayQuestion(index) {
  if (index < questions.length) {
    const question = questions[index];
    questionContainer.innerHTML = `
      <h2>${question.question}</h2>
      <ul>
        ${question.options.map(option => `<li><button class="option">${option}</button></li>`).join('')}
      </ul>
    `;
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(button => {
      button.addEventListener("click", () => checkAnswer(button.textContent, question.correctAnswer));
    });
  } else {
    endQuiz();
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;
  clearInterval(timerInterval);
  gameOverContainer.style.display = "none";
  questionContainer.style.display = "block"; 
}


// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    displayResult("Correct!");
  } else {
    timeLeft -= 10; // Deduct 10 seconds for incorrect answers
    displayResult("Wrong!");
  }
  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
}

// Function to display the result
function displayResult(resultText) {
  const resultContainer = document.getElementById("result-container");
  const resultTextElement = document.getElementById("result-text");
  resultTextElement.textContent = resultText;
  resultContainer.style.display = "block"; 

  setTimeout(() => {
    resultContainer.style.display = "none";
  }, 2000); // Hide after 2 seconds
}



// Function to update the timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  finalScoreElement.textContent = `Your Score: ${score}`;
}

// Function to display high scores
function displayHighScores() {
  // Clear previous high scores
  highScoreList.innerHTML = "";
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);
  // Display the high scores in the list
  highScores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highScoreList.appendChild(scoreItem);
  });
}

function submitScore() {
}

// Function to reset the scoreboard
function resetScoreboard() {
  localStorage.removeItem("highScores");
  highScoreList.innerHTML = "";
}

// Function to reset the page to default view
function resetPage() {
  gameOverContainer.style.display = "none";
  initialsInput.value = "";
  questionContainer.style.display = "block";
}

// Initial setup
gameOverContainer.style.display = "none";

function loadAndDisplayHighScores() {
  // Clear previous high scores
  highScoreList.innerHTML = "";
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);
  // Display the high scores in the list
  highScores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highScoreList.appendChild(scoreItem);
  });
}

// Call the function to load and display high scores when the page loads
loadAndDisplayHighScores();

