let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function loadQuestions() {

  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  const res = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
  const data = await res.json();
  console.log(data)

  questions = data.results.map(q => {
    const options = [...q.incorrect_answers, q.correct_answer];
    return {
      question: decodeHTML(q.question),
      options: shuffle(options),
      correct: q.correct_answer
    };
  });

  loadQuestion(); 
}

function loadQuestion(){
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex +1;
  questionElement.innerHTML = questionNo + ". " +currentQuestion.question


  currentQuestion.options.forEach(opt => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = opt;
    button.onclick = () => checkAnswer(opt);
    answerButtons.appendChild(button);
  });
}

function checkAnswer(selected) {
  const correct = decodeHTML(questions[currentQuestionIndex].correct);

  // Increase score if correct
  if (selected === correct) score++;

  // Disable all buttons and color them
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("bg-green-200");
    } else if (btn.textContent === selected) {
      btn.classList.add("bg-red-200");
    }
  });

  // Show "Next" button
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) loadQuestion();
  else {
    questionElement.textContent = "Quiz Finished!";
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    scoreElement.classList.remove("hidden");
  }
});

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
loadQuestions();
