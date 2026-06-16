// ===============================
// STUDENT AI QUIZ SYSTEM
// ===============================

// Questions Array

const questions = [
    {
        question: "What is the full form of AI?",
        options: [
            "Artificially Intelligent",
            "Artificial Intelligence",
            "Artificially Intelligence",
            "Advanced Intelligence"
        ],
        answer: "Artificial Intelligence"
    },
    {
        question: "What is Artificial Intelligence?",
        options: [
            "A field that aims to make humans more intelligent",
            "A field that aims to improve security",
            "A field that aims to develop intelligent machines",
            "A field that aims to mine data"
        ],
        answer: "A field that aims to develop intelligent machines"
    },
    {
        question: "Who is the inventor of Artificial Intelligence?",
        options: [
            "Geoffrey Hinton",
            "Andrew Ng",
            "John McCarthy",
            "Jürgen Schmidhuber"
        ],
        answer: "John McCarthy"
    },
    {
        question: "Which of the following is the branch of Artificial Intelligence?",
        options: [
            "Machine Learning",
            "Cyber Forensics",
            "Full Stack Development",
            "Network Design"
        ],
        answer: "Machine Learning"
    },
    {
        question: "What is the goal of Artificial Intelligence?",
        options: [
            "To solve artificial problems",
            "To extract scientific causes",
            "To explain various sorts of intelligence",
            "To solve real-world problems"
        ],
        answer: "To solve real-world problems"
    },
    {
        question: "Which of the following is an application of Artificial Intelligence?",
        options: [
            "Security Vulnerability Exploitation",
            "Language Understanding and NLP",
            "Website Creation",
            "Cloud Deployment"
        ],
        answer: "Language Understanding and NLP"
    },
    {
        question: "In how many categories is AI categorized?",
        options: [
            "5 Categories",
            "Based on Input",
            "3 Categories",
            "Not Categorized"
        ],
        answer: "3 Categories"
    },
    {
        question: "Based on which parameter is AI categorized?",
        options: [
            "Functionality Only",
            "Capabilities Only",
            "Capabilities and Functionality",
            "Not Categorized"
        ],
        answer: "Capabilities and Functionality"
    },
    {
        question: "Which of the following is a component of AI?",
        options: [
            "Learning",
            "Training",
            "Designing",
            "Puzzling"
        ],
        answer: "Learning"
    },
    {
        question: "What is the function of an AI Agent?",
        options: [
            "Mapping Goal Sequence to Action",
            "Working Without Human Interference",
            "Mapping Percept Sequence to Action",
            "Mapping Environment Sequence to Action"
        ],
        answer: "Mapping Percept Sequence to Action"
    }
];

// ===============================
// DOM ELEMENTS
// ===============================

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const studentForm = document.getElementById("student-form");

const studentNameInput = document.getElementById("studentName");
const rollNumberInput = document.getElementById("rollNumber");

const displayName = document.getElementById("displayName");
const displayRoll = document.getElementById("displayRoll");

const formError = document.getElementById("form-error");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const timerElement = document.getElementById("timer");

const resultName = document.getElementById("resultName");
const resultRoll = document.getElementById("resultRoll");
const totalQuestions = document.getElementById("totalQuestions");
const correctAnswers = document.getElementById("correctAnswers");
const wrongAnswers = document.getElementById("wrongAnswers");
const skippedAnswers = document.getElementById("skippedAnswers");
const percentage = document.getElementById("percentage");
const performance = document.getElementById("performance");

const restartBtn = document.getElementById("restartBtn");

// ===============================
// VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let skipped = 0;
let timer;
let timeLeft = 30;

let studentName = "";
let rollNumber = "";

// ===============================
// START QUIZ
// ===============================

studentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    studentName = studentNameInput.value.trim();
    rollNumber = rollNumberInput.value.trim();

    if (studentName === "" || rollNumber === "") {

        formError.textContent =
            "Please enter Student Name and Roll Number.";

        return;
    }

    formError.textContent = "";

    displayName.textContent = studentName;
    displayRoll.textContent = rollNumber;

    welcomeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    shuffleQuestions();

    loadQuestion();
});

// ===============================
// SHUFFLE QUESTIONS
// ===============================

function shuffleQuestions() {

    questions.sort(() => Math.random() - 0.5);

}

// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 30;

    startTimer();

    const current = questions[currentQuestion];

    questionText.textContent = current.question;

    optionsContainer.innerHTML = "";

    current.options.forEach(option => {

        const button = document.createElement("button");

        button.classList.add("option-btn");

        button.textContent = option;

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsContainer.appendChild(button);

    });

    updateProgress();
}

// ===============================
// TIMER
// ===============================

function startTimer() {

    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            skipped++;

            setTimeout(() => {
                nextQuestion();
            }, 500);
        }

    }, 1000);
}

// ===============================
// ANSWER SELECTION
// ===============================

function selectAnswer(button, selectedOption) {

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons =
        document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {

        btn.disabled = true;

        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }

    });

    if (selectedOption === correctAnswer) {

        score++;

        button.classList.add("correct");

    } else {

        wrong++;

        button.classList.add("wrong");

    }

    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResults();

    }
}

// ===============================
// PROGRESS BAR
// ===============================

function updateProgress() {

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const percent =
        ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width = percent + "%";

    progressPercent.textContent =
        Math.round(percent) + "%";
}

// ===============================
// SHOW RESULTS
// ===============================

function showResults() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percent =
        Math.round((score / questions.length) * 100);

    resultName.textContent = studentName;
    resultRoll.textContent = rollNumber;

    totalQuestions.textContent = questions.length;
    correctAnswers.textContent = score;
    wrongAnswers.textContent = wrong;
    skippedAnswers.textContent = skipped;

    percentage.textContent = percent + "%";

    if (percent >= 90) {

        performance.textContent =
            "Excellent Performance";

    } else if (percent >= 70) {

        performance.textContent =
            "Very Good";

    } else if (percent >= 50) {

        performance.textContent =
            "Good Effort";

    } else {

        performance.textContent =
            "Needs Improvement";
    }
}

// ===============================
// RESTART QUIZ
// ===============================

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;
    wrong = 0;
    skipped = 0;

    clearInterval(timer);

    studentNameInput.value = "";
    rollNumberInput.value = "";

    resultScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");

    shuffleQuestions();

});

// ===============================
// END
// ===============================