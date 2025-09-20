const stations = {
  1: { q: "What is 2 + 3?", a: 5, difficulty: "easy" },
  2: { q: "What is 7 - 4?", a: 3, difficulty: "easy" },
  3: { q: "What is 5 + 6?", a: 11, difficulty: "easy" },
  4: { q: "Multiply 2 × 3. What is it?", a: 6, difficulty: "medium" },
  5: { q: "Divide 12 ÷ 4. Result?", a: 3, difficulty: "medium" },
  6: { q: "Add 5 + 7 + 2. What’s the total?", a: 14, difficulty: "medium" },
  7: { q: "Multiply 3 × 6. What is it?", a: 18, difficulty: "hard" },
  8: { q: "What number is 15 ÷ 3 + 4?", a: 9, difficulty: "hard" },
  9: { q: "I am thinking of a number. Multiply me by 2 then add 6 to get 20. What number am I?", a: 7, difficulty: "hard" },
  10:{ q: "Three consecutive numbers add up to 30. What is the middle number?", a: 10, difficulty: "hard" }
};

let current = 1;
let attempts = 0;
let timerInterval;
let timeLeft = 7*60; // default 7 min

function startGame(){
  const selected = document.getElementById("timerSelect").value;
  timeLeft = parseInt(selected) * 60;

  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  showQuestion(current);
  startTimer();
}

function startTimer(){
  updateTimerDisplay();
  timerInterval = setInterval(()=>{
    timeLeft--;
    updateTimerDisplay();
    if(timeLeft<=0){
      clearInterval(timerInterval);
      document.getElementById("feedback").innerText = "⏰ Time's up! Game over!";
      document.getElementById("feedback").className = "wrong";
      document.getElementById("answer").disabled = true;
    }
  },1000);
}

function updateTimerDisplay(){
  const minutes = String(Math.floor(timeLeft/60)).padStart(2,"0");
  const seconds = String(timeLeft%60).padStart(2,"0");
  const timerElem = document.getElementById("timer");
  timerElem.innerText = `Time Left: ${minutes}:${seconds}`;
  timerElem.style.color = timeLeft<=60 ? "#d32f2f" : "#333";
}

function showQuestion(n){
  const questionElem = document.getElementById("question");
  questionElem.innerText = stations[n].q;

  // Set color based on difficulty
  if(stations[n].difficulty === "easy") questionElem.style.color = "green";
  else if(stations[n].difficulty === "medium") questionElem.style.color = "orange";
  else questionElem.style.color = "red";

  document.getElementById("progress").innerText = `Question ${n} of ${Object.keys(stations).length}`;
  document.getElementById("answer").value="";
  document.getElementById("feedback").innerText="";
  document.getElementById("answer").disabled = false;
  attempts = 0;
}

function submitAnswer(){
  if(timeLeft<=0) return;
  const ans = parseInt(document.getElementById("answer").value.trim());
  const correct = stations[current].a;
  attempts++;
  const isCorrect = Array.isArray(correct) ? correct.includes(ans) : ans === correct;

  if(isCorrect){
    document.getElementById("feedback").innerText = "✅ Correct!";
    document.getElementById("feedback").className="correct";
    if(current<Object.keys(stations).length){
      current++;
      setTimeout(()=> showQuestion(current),500);
    } else {
      clearInterval(timerInterval);
      document.getElementById("feedback").innerText = "🎉 You completed all riddles!";
    }
  } else {
    let fb="❌ Wrong! Try again.";
    if(attempts>=3) fb += " 💡 Hint: "+giveHint(current);
    document.getElementById("feedback").innerText = fb;
    document.getElementById("feedback").className="wrong";
  }
}

function giveHint(n){
  const hints = {
    1:"2 + 3 = ?",
    2:"7 - 4 = ?",
    3:"5 + 6 = ?",
    4:"2 × 3 = ?",
    5:"12 ÷ 4 = ?",
    6:"5 + 7 + 2 = ?",
    7:"3 × 6 = ?",
    8:"15 ÷ 3 + 4 = ?",
    9:"(Answer ×2) + 6 = 20",
    10:"Three consecutive numbers add up to 30"
  };
  return hints[n] || "No hint available.";
}
