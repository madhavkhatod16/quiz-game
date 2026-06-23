var questions = [
    {
        q: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "Home Text Markup Language"],
        ans: "Hyper Text Markup Language"
    },
{
    q: "Which tag is used for link?",
    options: ["link tag", "a tag", "p tag", "h1 tag"],
    ans: "a tag"
},
    {
        q: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "bg-color"],
        ans: "color"
    },
    {
        q: "Which CSS property makes text bold?",
        options: ["font-style", "font-weight", "text-size", "bold"],
        ans: "font-weight"
    },
    {
        q: "Which keyword declares variable in JS?",
        options: ["var", "int", "string", "num"],
        ans: "var"
    },
    {
        q: "Which is JavaScript comment?",
        options: ["<!-- -->", "//", "##", "**"],
        ans: "//"
    },
    {
        q: "Which prints in console?",
        options: ["print()", "console.log()", "show()", "display()"],
        ans: "console.log()"
    },
    {
        q: "Bootstrap button class is?",
        options: [".button", ".btn", ".click", ".box"],
        ans: ".btn"
    },
    {
        q: "Bootstrap responsive box class is?",
        options: [".container", ".main", ".wrapper", ".box"],
        ans: ".container"
    },
    {
        q: "JavaScript file name is usually?",
        options: ["style.css", "index.html", "script.js", "bootstrap.css"],
        ans: "script.js"
    }
];

var current = 0;
var selected = ["", "", "", "", "", "", "", "", "", ""];

loadQuestion();

function loadQuestion() {
    document.getElementById("questionNumber").innerHTML =
        "Question " + (current + 1) + " of " + questions.length;

    document.getElementById("questionText").innerHTML = questions[current].q;

    var box = document.getElementById("optionsBox");
    box.innerHTML = "";

    for (var i = 0; i < questions[current].options.length; i++) {
        var opt = questions[current].options[i];

        if (selected[current] == opt) {
            box.innerHTML += "<div class='option selected' onclick='selectOption(\"" + opt + "\")'>" + opt + "</div>";
        } else {
            box.innerHTML += "<div class='option' onclick='selectOption(\"" + opt + "\")'>" + opt + "</div>";
        }
    }

    var progress = ((current + 1) / questions.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressBar").innerHTML = Math.round(progress) + "%";

    if (current == questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline-block";
    } else {
        document.getElementById("nextBtn").style.display = "inline-block";
        document.getElementById("submitBtn").style.display = "none";
    }

    loadPalette();
}

function loadPalette() {
    var palette = document.getElementById("paletteBox");
    palette.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var cls = "";

        if (selected[i] != "") {
            cls = "answered";
        }

        if (i == current) {
            cls = cls + " active";
        }

        palette.innerHTML += "<button class='" + cls + "' onclick='goToQuestion(" + i + ")'>" + (i + 1) + "</button>";
    }
}

function goToQuestion(num) {
    current = num;
    loadQuestion();
}

function selectOption(answer) {
    selected[current] = answer;
    loadQuestion();
}

function nextQuestion() {
    if (current < questions.length - 1) {
        current++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (current > 0) {
        current--;
        loadQuestion();
    }
}

function submitQuiz() {
    for (var i = 0; i < selected.length; i++) {
        if (selected[i] == "") {
            alert("Please answer all questions before submitting.");
            return;
        }
    }

    showResult();
}

function showResult() {
    var correct = 0;
    var wrong = 0;

    for (var i = 0; i < questions.length; i++) {
        if (selected[i] == questions[i].ans) {
            correct++;
        } else {
            wrong++;
        }
    }

    var percentage = (correct / questions.length) * 100;
    var grade = "";

    if (percentage >= 80) {
        grade = "Excellent";
    } else if (percentage >= 60) {
        grade = "Good";
    } else if (percentage >= 40) {
        grade = "Average";
    } else {
        grade = "Need Practice";
    }

    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    var result = "";

    result += "<div class='result-card'>";
    result += "<h2>Quiz Result</h2>";
    result += "<h3>Score: " + correct + " / 10</h3>";
    result += "<h4>Percentage: " + percentage + "%</h4>";
    result += "<h4>" + grade + "</h4>";
    result += "<p class='text-success'>Correct: " + correct + "</p>";
    result += "<p class='text-danger'>Wrong: " + wrong + "</p>";
    result += "<button class='btn btn-primary' onclick='restartQuiz()'>Restart Quiz</button>";
    result += "</div>";

    document.getElementById("resultSection").innerHTML = result;
}

function restartQuiz() {
    current = 0;
    selected = ["", "", "", "", "", "", "", "", "", ""];

    document.getElementById("quizSection").style.display = "block";
    document.getElementById("resultSection").style.display = "none";

    loadQuestion();
}
