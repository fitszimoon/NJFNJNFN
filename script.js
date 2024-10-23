let questions = [
    {  //Q1
        question: "Ethanol is primaraily made of??",
        options: ["Corn", "Acids", "Produce by animals", "Starch"],
        correctAnswer: 0
    },
    {  //Q2
        question: "What is the starting prcoess in making ethanol?",
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
        question: "How can ethanol lead to improved overall efficiency despite it's low energy content?",
        options: ["Ethanol requires less oil", "When appropriately blended, can prove power mileage", "Ethanol has a higher energy density enhancing efficiency", "Ethanol engines have better combustion control, optimizing performance"],
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
        options: ["To compress the air-fuel mixture before ignition", " To ignite the air-gasoline mixture, causing an explosive release of heat energy", "To cool the combustion chamber during operation", "To control the exhaust gases after combustion"],
        correctAnswer: 1
    },  
    {   //Q9
        question: "Who designed the first internal combustion engine",
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
let score = 0;
let answeredQuestions = [];  // Store indices of answered questions

// Fisher-Yates shuffle for randomizing the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Randomize the questions at the start
shuffle(questions);

// Load the question and shuffle the options
function loadQuestion() {
    // Skip already answered questions when going back
    while (answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }

    let currentQuestion = questions[currentQuestionIndex];
    let options = currentQuestion.options.slice(); // Create a copy of options array
    
    // Shuffle the options for random order
    shuffle(options);
    
    document.getElementById("question").textContent = currentQuestion.question;
    
    let buttons = document.getElementsByClassName("option");
    
    // Display shuffled options
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = options[i];
        
        // Check if the selected option matches the original correct answer
        buttons[i].onclick = function() {
            checkAnswer(options[i], currentQuestion.correctAnswer);
        };
    }

    // Show or hide the "Back" button based on the current question index and unanswered questions
    if (currentQuestionIndex === 0 || !canGoBack()) {
        document.getElementById("back").style.display = "none"; // Hide "Back" button on the first question or no unanswered questions left
    } else {
        document.getElementById("back").style.display = "block"; // Show "Back" button after the first question
    }
    
    // Update the progress bar
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
    
    // Add current question to the list of answered questions
    answeredQuestions.push(currentQuestionIndex);
    
    // Move to the next question after checking the answer (whether correct or wrong)
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Display quiz completion message and final score
        alert("Quiz completed! Your final score is " + score);
        
        // Optionally, you can also display a message in the HTML
        document.getElementById("question").textContent = "Quiz Complete! Final Score: " + score;
        document.getElementsByClassName("options")[0].style.display = "none"; // Hide options after completion
        document.getElementById("submit").style.display = "none"; // Hide submit button after completion
        document.getElementById("back").style.display = "none"; // Hide back button after completion
    }
}

// Go back to the previous unanswered question
function goBack() {
    if (canGoBack()) {
        currentQuestionIndex--;
        
        // Skip already answered questions
        while (answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex > 0) {
            currentQuestionIndex--;
        }
        
        loadQuestion();
    }
}

// Check if we can go back to a previous unanswered question
function canGoBack() {
    for (let i = currentQuestionIndex - 1; i >= 0; i--) {
        if (!answeredQuestions.includes(i)) {
            return true;
        }
    }
    return false;
}

// Update the progress bar
function updateProgressBar() {
    let progress;

    // If all questions are answered, set the progress to 100%
    if (answeredQuestions.length === questions.length) {
        progress = 100;
    } else {
        progress = (answeredQuestions.length / questions.length) * 100;
    }

    document.getElementById("progress-bar").style.width = progress + "%";
}

// Load the first question on page load
window.onload = function () {
    loadQuestion();
};

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('.quiz-container');
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shifted');
}
