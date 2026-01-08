const quiz = [
    {
        question: "What is 7 + 5?",
        options: ["10", "11", "12", "13"],
        answer: 2
    },
    {
        question: "What is 9 - 4?",
        options: ["3", "4", "5", "6"],
        answer: 2
    },
    {
        question: "What is 6 × 7?",
        options: ["42", "36", "48", "40"],
        answer: 0
    },
    {
        question: "What is 15 ÷ 3?",
        options: ["5", "3", "6", "4"],
        answer: 0
    },
    {
        question: "What is 8²?",
        options: ["16", "32", "64", "8"],
        answer: 2
    },
    {
        question: "What is the value of 3 + 4 × 2?",
        options: ["14", "11", "10", "7"],
        answer: 1
    },
    {
        question: "What is 1/2 + 1/4?",
        options: ["1/4", "3/4", "2/3", "1"],
        answer: 1
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        answer: 2
    },
    {
        question: "Solve for x: x + 5 = 12. What is x?",
        options: ["5", "6", "7", "8"],
        answer: 2
    },
    {
        question: "What is 10% of 200?",
        options: ["10", "20", "30", "40"],
        answer: 1
    }
];

let currentQuestion = 0;

// Store the user's selected option index for each question (null if unanswered)
let userAnswers = [];

function loadQuestion() {
    // Number the question: "Question X of Y: <question>"
    document.getElementById("question").innerText =
        `Question ${currentQuestion + 1} of ${quiz.length}: ${quiz[currentQuestion].question}`;

    // Roman numerals for options
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

    quiz[currentQuestion].options.forEach((option, index) => {
        const prefix = romans[index] ? romans[index] + ". " : (index + 1) + ". ";
        const btn = document.getElementById("opt" + index);
        btn.innerText = prefix + option;
        // reset inline styles
        btn.style.backgroundColor = "";
    });

    // Update Prev button disabled state and Next/Finish label
    const prevBtn = document.querySelector('.prev');
    if (prevBtn) prevBtn.disabled = currentQuestion === 0;
    const nextBtn = document.querySelector('.next');
    if (nextBtn) nextBtn.innerText = currentQuestion === quiz.length - 1 ? 'Finish' : 'Next';

    // Show any previously selected answer for this question
    updateOptionHighlights();
}

function updateOptionHighlights() {
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById('opt' + i);
        if (!btn) continue;
        if (userAnswers[currentQuestion] === i) {
            btn.style.backgroundColor = '#cce5ff';
        } else {
            btn.style.backgroundColor = '';
        }
    }
}

function checkAnswer(selected) {
    // Save the user's selection for the current question but do not auto-advance
    userAnswers[currentQuestion] = selected;
    updateOptionHighlights();
}

function nextQuestion() {
    // If not on the last question, move forward; otherwise calculate score and show result
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        // Calculate score
        let score = 0;
        for (let i = 0; i < quiz.length; i++) {
            if (userAnswers[i] === quiz[i].answer) score++;
        }
        document.querySelector('.quiz-container').innerHTML =
            `<h2>Quiz Completed</h2>
             <p>Your Score: ${score} / ${quiz.length}</p>`;
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Utility: Fisher-Yates shuffle
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Shuffle questions "time to time" — 50% chance on page load
if (Math.random() < 0.5) {
    shuffleArray(quiz);
}

loadQuestion();

