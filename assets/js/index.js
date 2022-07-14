/* first right questions object this will have the question, the choices 
(an array of possible answers), and the actual answer
*/

const questions = [
    {
        questionText: "Who was the first actor to win Best Actor at the Academy Awards?",
        choices: ["Emil Jannings", "Humphrey Bogart", "John Travolta", "Peter Lorre"],
        answer: "Emil Jannings"
    },
    {
        questionText: 'Who first refused the Best Actor award at the Oscars?',
        choices: ["Marlon Brando", "Peter Fonda", "George C. Scott", "Will Smith"],
        answer: "George C. Scott"
    },
    {
        questionText: 'Who directed Scarface (1983)?',
        choices: ['Oliver Stone', 'David Lynch', "Brian DePalma", "Peter Jackson"],
        answer: "Brian DePalma"
    }
];

//starting conditions 
let quizQuestionIndex = 0;
let timerID;
let timeCount = questions.length * 15;


//DOM variables
const startPageEl = document.querySelector("#startPage");
const startButton = document.querySelector('#startQuiz');
const questionEl = document.querySelector('#questions');
const timerEl = document.querySelector('#timer');
const questionsTextEl = document.querySelector('#question-text');
const choicesEl = document.querySelector('#choices');
const feedbackEl = document.querySelector('#feedback');
const finalScoreEl = document.querySelector("#final-score");
const finishScreenEl = document.querySelector('#finish-screen');
const initialsInputEl = document.querySelector("#initials");
const initialsSubmitButton = document.querySelector('#submit');



function startQuiz() {
    startPageEl.classList.add('hidden');
    questionEl.setAttribute('class', 'display');
    timerEl.setAttribute('class', 'display');
    timerID = setInterval(runClock, 1000);
    askQuestions();
}

function askQuestions() {
    let currentQuestion = questions[quizQuestionIndex];
    let question = currentQuestion.questionText;
    questionsTextEl.textContent = question;
    choicesEl.innerHTML = '';
    let choiceArray = currentQuestion.choices;
    for (let i = 0; i < choiceArray.length; i++) {
        let choiceButtonEl = document.createElement('button');
        choiceButtonEl.textContent = choiceArray[i];
        choicesEl.appendChild(choiceButtonEl);
    }
}

function runClock() {
    timeCount--;
    timerEl.textContent = "Time Remaining: " + timeCount;
    if(!timeCount) {
        alert('You have run out of time.');
        clearInterval(timerID);
    }
}

function handleChoices(event) {
    let choiceValue = event.target.textContent 
    // console.log(event.target);
    console.log(choiceValue);
    if (choiceValue === questions[quizQuestionIndex].answer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = 'green';
        showFunnyImage('correct');
        playSound('correct');
    } else {
        timeCount -= 5;
        if (timeCount < 0) {
            timeCount = 0
        }
        timerEl.textContent = timeCount;
        feedbackEl.textContent = "Unfortunately, you are wrong!";
        feedbackEl.style.color = 'red';
        showFunnyImage('poop')
        playSound('wrong')
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'hidden');
    }, 1000);

    quizQuestionIndex++;
    if (quizQuestionIndex === questions.length) {
        quizEnd();
    } else {
        askQuestions();
    }
}

function quizEnd() {
    //console.log('quizEnd');
    // clear time interval
    clearInterval(timerID);
    // remove the hide settings set in css for the finish screen
    finishScreenEl.removeAttribute("class");
    finalScoreEl.textContent = timeCount;
    // make sure to hide the questions element. You have to set the attribute to hide which in the css says it will display no content
    questionEl.setAttribute("class", "hide");
    return;

}


function playSound(name) {
    let audio = new Audio('assets/sounds/' + name + '.mp3');
    audio.play();
}

function showFunnyImage(name) {
    let funnyImage = new Image();
    funnyImage.src = 'assets/images/' + name + '.jpeg'
    document.body.appendChild(funnyImage);
    setTimeout(function() {
        funnyImage.classList.add('hidden')
    }, 1000)
}




// Event Listeners
startButton.addEventListener('click', startQuiz);
choicesEl.onclick = handleChoices;