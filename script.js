const get_qst = document.getElementById('qst');
const get_opt = document.getElementById('opt');
const resultEl = document.getElementById('result');
const pr = document.getElementById('progress');
const err = document.getElementById('err');
const timerDisplay = document.getElementById('timer');
const con = document.getElementById('MCQ-container');
const com = document.getElementById('comment');
const nextBtn = document.getElementById('nextBtn');
const categorySelect = document.getElementById('category-select');
const topic = document.getElementById('topic');

let currentQuestion = 0;
let score = 0;
let timeLeft;
let timerId;

let selectedCategory = '';
let categoryQuestions = [];

function startQuiz() {
  const category = document.getElementById('category').value;
  if (!category) {
    alert("Please select a category.");
    return;
  }

  selectedCategory = category;
  categoryQuestions = questions[category];
  currentQuestion = 0;
  score = 0;

  categorySelect.style.display = 'none';
  con.style.display = 'block';

  resultEl.style.display = 'none';
  com.style.display = 'none';
  get_qst.style.display = 'block';
  get_opt.style.display = 'block';
  nextBtn.style.display = "inline-block";
  pr.style.display = "block";

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerId);

  timeLeft = 30;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      skipQuestion();
    }
  }, 1000);

  const q = categoryQuestions[currentQuestion];
  
  topic.textContent = `Topic - ${selectedCategory}`;
  get_qst.textContent = `${currentQuestion + 1}. ${q.question}`;
  pr.textContent = `Question ${currentQuestion + 1} of ${categoryQuestions.length}`;
  get_opt.innerHTML = "";
  q.options.forEach(opt => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
    get_opt.appendChild(label);
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');

  if (!selected) {
    err.innerHTML = 'Please Choose any Option!';
    err.style.display = 'block';
    return;
  }

  err.style.display = 'none';
  clearInterval(timerId);
  nextBtn.style.display = "none";
  timerDisplay.style.display = "none";

  const correctAnswer = categoryQuestions[currentQuestion].answer;
  const radios = document.getElementsByName("option");

  radios.forEach(radio => {
    if (radio.value === correctAnswer) {
      radio.parentElement.style.color = "green";
      radio.parentElement.style.fontWeight = "bold";
    }
    if (radio.checked && radio.value !== correctAnswer) {
      radio.parentElement.style.color = "red";
      radio.parentElement.style.fontWeight = "bold";
    }
    radio.disabled = true;
  });

  if (selected.value === correctAnswer) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < categoryQuestions.length) {
      loadQuestion();
      nextBtn.style.display = "inline-block";
      timerDisplay.style.display = "block";
    } else {
      showResult();
    }
  }, 2000);
}

function skipQuestion() {
  const correctAnswer = categoryQuestions[currentQuestion].answer;
  const radios = document.getElementsByName("option");

  nextBtn.style.display = "none";
  timerDisplay.style.display = "none";
  err.style.display = 'none';

  let userAnsweredCorrect = false;

  radios.forEach(radio => {
    if (radio.checked && radio.value === correctAnswer) {
      userAnsweredCorrect = true;
    }

    if (radio.value === correctAnswer) {
      radio.parentElement.style.color = "green";
      radio.parentElement.style.fontWeight = "bold";
    }

    radio.disabled = true;
  });

  if (userAnsweredCorrect) {
    score++;
  }

  const msg = document.createElement("p");
  msg.textContent = "Time's up!";
  msg.style = "color:green;font-weight:bold;font-size:20px;text-align:center";
  get_opt.appendChild(msg);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < categoryQuestions.length) {
      loadQuestion();
      nextBtn.style.display = "inline-block";
      timerDisplay.style.display = "block";
    } else {
      showResult();
    }
  }, 2000);
}

get_opt.addEventListener('change', () => {
  err.style.display = 'none';
});

function showResult() {
  timerDisplay.style.display = "none";
  get_qst.style.display = "none";
  get_opt.style.display = "none";
  nextBtn.style.display = "none";
  pr.style.display = "none";
  con.classList.add('MCQ-edit');
  resultEl.style.display = "block";
  com.style.display = 'block';

  resultEl.textContent = `You Scored ${score} out of ${categoryQuestions.length}`;
  let point = (score * 100) / categoryQuestions.length;

  if (point == 0) {
    com.textContent = "Try reading the basics first 📘";
  } else if (point <= 25) {
    com.textContent = "Go and get a History Book 😂";
  } else if (point <= 50) {
    com.textContent = "Keep trying 👍";
  } else if (point <= 75) {
    com.textContent = "Great Dude 🫡";
  } else if (point <= 99) {
    com.textContent = "You are just...... 🔥";
  } else if (point == 100) {
    com.textContent = "Congratulations Champ 🥵";
  }
}
