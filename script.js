const india  = [
  {
    question: "Who was the Viceroy of India during the partition of Bengal in 1905?",
    options: ["Lord Curzon", "Lord Ripon", "Lord Minto", "Lord Wellesley"],
    answer: "Lord Curzon"
  },
  {
    question: "Which Indian classical dance form originated in Andhra Pradesh?",
    options: ["Odissi", "Kuchipudi", "Mohiniyattam", "Kathakali"],
    answer: "Kuchipudi"
  },
  {
    question: "What is the southernmost point of Indian territory?",
    options: ["Kanyakumari", "Indira Point", "Rameswaram", "Minicoy"],
    answer: "Indira Point"
  },
  {
    question: "Which article in the Indian Constitution deals with emergency provisions?",
    options: ["Article 352", "Article 368", "Article 370", "Article 356"],
    answer: "Article 352"
  },
  {
    question: "Who authored the book *Discovery of India*?",
    options: ["B.R. Ambedkar", "Sardar Patel", "Jawaharlal Nehru", "Mahatma Gandhi"],
    answer: "Jawaharlal Nehru"
  },
  {
    question: "The capital of the Maurya Empire was:",
    options: ["Pataliputra", "Kalinga", "Taxila", "Ujjain"],
    answer: "Pataliputra"
  },
  {
    question: "Which Indian state shares its border with the most number of other Indian states?",
    options: ["Uttar Pradesh", "Madhya Pradesh", "Chhattisgarh", "Bihar"],
    answer: "Uttar Pradesh"
  },
  {
    question: "The first Indian satellite launched into space was:",
    options: ["INSAT-1", "Bhaskara", "Aryabhata", "Rohini"],
    answer: "Aryabhata"
  },
  {
    question: "Which is the deepest landlocked and saltwater lake in India?",
    options: ["Wular Lake", "Pulicat Lake", "Sambhar Lake", "Lonar Lake"],
    answer: "Sambhar Lake"
  },
  {
    question: "Which Indian state has the largest forest cover?",
    options: ["Arunachal Pradesh", "Madhya Pradesh", "Chhattisgarh", "Odisha"],
    answer: "Madhya Pradesh"
  },
  {
    question: "Who was the first woman ruler of Delhi?",
    options: ["Razia Sultana", "Chand Bibi", "Nur Jahan", "Ahilyabai Holkar"],
    answer: "Razia Sultana"
  },
  {
    question: "Who was the first Indian to win an individual Olympic gold medal?",
    options: ["Abhinav Bindra", "Leander Paes", "Vijender Singh", "Milkha Singh"],
    answer: "Abhinav Bindra"
  },
  {
    question: "Which of these temples is not in Tamil Nadu?",
    options: ["Brihadeeswarar Temple", "Meenakshi Temple", "Konark Sun Temple", "Rameswaram Temple"],
    answer: "Konark Sun Temple"
  },
  {
    question: "The Bhakti Movement originated in which century?",
    options: ["6th century", "8th century", "12th century", "15th century"],
    answer: "8th century"
  },
  {
    question: "Which Indian physicist won the Nobel Prize for the Raman Effect?",
    options: ["Homi Bhabha", "C.V. Raman", "Satyendra Nath Bose", "Meghnad Saha"],
    answer: "C.V. Raman"
  },
  {
    question: "What is the name of the Indian Mars Orbiter Mission?",
    options: ["Chandrayaan", "Mangalyaan", "ISROSat", "Shukrayaan"],
    answer: "Mangalyaan"
  },
  {
    question: "Which Mughal emperor built the Red Fort in Delhi?",
    options: ["Babur", "Akbar", "Jahangir", "Shah Jahan"],
    answer: "Shah Jahan"
  },
  {
    question: "In which year was the Indian National Congress founded?",
    options: ["1857", "1885", "1905", "1920"],
    answer: "1885"
  },
  {
    question: "Which mountain pass connects India and China in Arunachal Pradesh?",
    options: ["Nathu La", "Shipki La", "Diphu Pass", "Bum La"],
    answer: "Bum La"
  },
  {
    question: "Which city is the headquarters of the Indian Space Research Organisation (ISRO)?",
    options: ["Hyderabad", "Bengaluru", "Ahmedabad", "Chennai"],
    answer: "Bengaluru"
  }
];


const get_qst = document.getElementById('qst');
const get_opt = document.getElementById('opt');
const resultEl = document.getElementById('result');
const pr = document.getElementById('progress');
const err = document.getElementById('err');
const timerDisplay = document.getElementById('timer');
let currentQuestion = 0;
let score = 0;

let timeLeft;
let timerId;

function loadQuestion() {
  clearInterval(timerId); // Stop previous timer

  // Reset and start new timer
  timeLeft = 30;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      skipQuestion(); // Auto-skip on timeout
    }
  }, 1000);

  // Display question and options
  const q = india[currentQuestion];
  get_qst.textContent = `${currentQuestion + 1}. ${q.question}`;
  pr.textContent = `Question ${currentQuestion + 1} of ${india.length}`;
  get_opt.innerHTML = "";

  q.options.forEach(opt => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${opt}"> ${opt}
    `;
    get_opt.appendChild(label);
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  const nextBtn = document.querySelector('button');

  if (!selected) {
    err.innerHTML = 'Please Choose any Option !';
    err.style.display = 'block';
    return; // ✅ Don't reload question or stop timer
  }

  // Clear error if answer selected
  err.style.display = 'none';
  clearInterval(timerId); // ✅ Stop the timer only after valid selection

  nextBtn.style.display = "none";
  timerDisplay.style.display = "none";

  const correctAnswer = india[currentQuestion].answer;
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
    if (currentQuestion < india.length) {
      loadQuestion();
      nextBtn.style.display = "inline-block";
      timerDisplay.style.display = "block";
    } else {
      showResult();
    }
  }, 2000);
}

//auto-hide the error message when user picks an option
get_opt.addEventListener('change', () => {
  err.style.display = 'none';
});


function skipQuestion() {
  const correctAnswer = india[currentQuestion].answer;
  const radios = document.getElementsByName("option");
  const nextBtn = document.querySelector('button');

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

  //Update score if user had selected correct option before timeout
  if (userAnsweredCorrect) {
    score++;
  }

  const msg = document.createElement("p");
  msg.textContent = "Time's up!";
  msg.style = "color:green;font-weight:bold;font-size:20px;text-align:center";
  get_opt.appendChild(msg);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < india.length) {
      loadQuestion();
      nextBtn.style.display = "inline-block";
      timerDisplay.style.display = "block";
    } else {
      showResult();
    }
  }, 2000);
}


var con = document.getElementById('MCQ-container');
var com = document.getElementById('comment');
resultEl.style.display='none'; //Hide result initialy
com.style.display='none';

function showResult() {
  timerDisplay.style.display = "none";
  get_qst.style.display = "none";
  get_opt.style.display = "none";
  document.querySelector('button').style.display = "none";
  con.classList.add('MCQ-edit');
  pr.style.display = "none";
  resultEl.style.display = "block";
  com.style.display='block';
  resultEl.textContent = `You Scored ${score} out of ${india.length}`;
  let point = (score*100)/india.length;
  if(point==0){

  }
  else if(point<=25){
    com.textContent = "Go and get a History Book 😂";
  }
  else if(point<=50){
    com.textContent = "Keep trying 👍";
  }
  else if(point<=75){
    com.textContent = "Great Dude 🫡";
  }
  else if(point<=99){
    com.textContent = "You are just...... 🔥";
  }
  else if(point==100){
    com.textContent = "Are you a Historian?🥵";
  }
}

// Start quiz
loadQuestion();

