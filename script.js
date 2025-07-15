const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "What is the capital of Bangladesh?",
    options: ["Dhaka", "Chittagong", "Barisal", "Sylhet"],
    correct: "Dhaka"
  }
];

let index = 0;
let score = 0;

const qEl = document.getElementById("question");
const optEl = document.getElementById("option");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion(){
    const q = questions[index];
    qEl.textContent = q.question;
    optEl.innerHTML = "";

    q.options.forEach(opt =>{
        const btn = document.createElement("button");
 btn.textContent = opt;
 btn.onclick = () => checkAnswer(opt);
 optEl.appendChild(btn);
    })
}

function checkAnswer(selected) {
  const correct = questions[index].correct;
  if (selected === correct) score++;

  Array.from(optEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("bg-green-200");
    else if (btn.textContent === selected) btn.classList.add("bg-red-200");
  });
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index < questions.length) loadQuestion();
  else {
    qEl.textContent = "Quiz Finished!";
    optEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
    scoreEl.classList.remove("hidden");
  }
});

loadQuestion();