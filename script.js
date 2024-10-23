let username = "";
let score = 0;
let scoreHistory = [];
let questions = [
    {  //Q1
        question: "Ethanol is primarily made of??",
        options: ["Corn", "Acids", "Produced by animals", "Starch"],
        correctAnswer: 0
    },
    {  //Q2
        question: "What is the starting process in making ethanol?",
        options: ["Distillation of starch", "Fermentation of sugar", "Hydrolysis of cellulose", "Synthesis of glucose"],
        correctAnswer: 1
    },
    {   //Q3
        question: "The engine works in 4 stages; what are these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {   //Q4
        question: "What is the approximate percentage of ethanol content in beer?",
        options: ["17-18%", "10-12%", "20-25%", "15-16%"],
        correctAnswer: 0
    },
    {  //Q5
        question: "How can ethanol lead to improved overall efficiency despite its low energy content?",
        options: ["Ethanol requires less oil", "When appropriately blended, it can improve power mileage", "Ethanol has a higher energy density enhancing efficiency", "Ethanol engines have better combustion control, optimizing performance"],
        correctAnswer: 1
    },
    {   //Q6
        question: "How does the higher octane rating of ethanol affect engine performance?",
        options: ["It leads to knocking", "It allows engines to run at a higher compression ratio without knocking, resulting in greater power", "It decreases overall engine efficiency", "It requires more fuel to achieve optimal performance"],
        correctAnswer: 1
    },
    {   //Q7
        question: "What is the octane rating of ethanol compared to that of gasoline?",
        options: ["Ethanol has an octane rating of 95, while gasoline averages 90", "Ethanol has an octane rating of 109, while gasoline ranges from 91-97", "Both have similar octane ratings of around 100", "Ethanol's octane rating is lower than most gasoline blends"],
        correctAnswer: 1
    },
    {   //Q8
        question: "What is the role of the spark in an Otto cycle engine?",
        options: ["To compress the air-fuel mixture before ignition", "To ignite the air-gasoline mixture, causing an explosive release of heat energy", "To cool the combustion chamber during operation", "To control the exhaust gases after combustion"],
        correctAnswer: 1
    },  
    {   //Q9
        question: "Who designed the first internal combustion engine?",
        options: ["Samuel Morey", "Sammuel Morey", "Nicolaus Otto", "Nicolas Otto"],
        correctAnswer: 0
    },
    {   //Q10
        question: "In order to make the final ethanol product (99% ethanol content), what process does it go through?",
        options: ["Distillation", "Fermentation", "Reverse Osmosis", "Molecular Sieve Process"],
        correctAnswer: 3
    }
];

let currentQuestionIndex = 0;
let answeredQuestions = [];

// Fisher-Yates shuffle for randomizing the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Randomize the questions at the start
shuffle(questions);

// Function to capture the username and start the quiz
function startQuiz() {
    username = document.getElementById("username-input").value;

    if (username.trim() === "") {
        alert("Please enter a valid username.");
        return;
    }

    document.getElementById("username-page").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

// Function to save score after quiz completion
function saveScore() {
    scoreHistory.push({ username: username, score: score });
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
    displayScoreHistory();
}

// Function to display score history
function displayScoreHistory() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = "";

    scoreHistory.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = `${entry.username}: ${entry.score} points`;
        scoreList.appendChild(li);
    });

    document.getElementById('score-history').style.display = 'block';
}

// Load the question and shuffle the options
function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let options = currentQuestion.options.slice();
    shuffle(options);

    document.getElementById("question").textContent = currentQuestion.question;
    let buttons = document.getElementsByClassName("option");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = options[i];
        buttons[i].onclick = function () {
            checkAnswer(options[i], currentQuestion.correctAnswer);
        };
    }

    document.getElementById("back").style.display = currentQuestionIndex === 0 || !canGoBack() ? "none" : "block";
    updateProgressBar();
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, correctAnswerIndex) {
    let correctAnswer = questions[currentQuestionIndex].options[correctAnswerIndex];
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("score").textContent = score;
        alert("Correct!");
    } else {
        alert("Wrong answer! Moving to next question.");
    }

    answeredQuestions.push(currentQuestionIndex);
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz completed! Your final score is " + score);
        saveScore();
        document.getElementById("question").textContent = "Quiz Complete! Final Score: " + score;
        document.getElementsByClassName("options")[0].style.display = "none";
        document.getElementById("submit").style.display = "none";
        document.getElementById("back").style.display = "none";
    }
}

function goBack() {
    if (canGoBack()) {
        currentQuestionIndex--;
        while (answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex > 0) {
            currentQuestionIndex--;
        }
        loadQuestion();
    }
}

function canGoBack() {
    for (let i = currentQuestionIndex - 1; i >= 0; i--) {
        if (!answeredQuestions.includes(i)) {
            return true;
        }
    }
    return false;
}

function updateProgressBar() {
    let progress = (answeredQuestions.length / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

window.onload = function () {
    const storedScores = localStorage.getItem('scoreHistory');
    if (storedScores) {
        scoreHistory = JSON.parse(storedScores);
        displayScoreHistory();
    }
    loadQuestion();
};

// Function to toggle the sidebar visibility and adjust main content
function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let mainContent = document.getElementById('.quiz-container');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        mainContent.style.marginLeft = '0';
    } else {
        sidebar.classList.add('open');
        mainContent.style.marginLeft = '250px'; // Adjust based on your sidebar width
    }
}
