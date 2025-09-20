const stations = { 
  1: { q: "What is 3 × 4?", a: 12, difficulty: "easy" },
  2: { q: "What is 12 ÷ 3?", a: 4, difficulty: "easy" },
  3: { q: "What is 5 × 6?", a: 30, difficulty: "easy" },
  4: { q: "I am a number. Multiply me by 2 and add 5 to get 17. What number am I?", a: 6, difficulty: "medium" },
  5: { q: "The sum of two consecutive numbers is 27. What is the larger number?", a: 14, difficulty: "medium" },
  6: { q: "I am thinking of a number. Divide me by 3, then add 7 to get 16. What number am I?", a: 27, difficulty: "medium" },
  7: { q: "Three times a number minus 5 equals 16. What is the number?", a: 7, difficulty: "hard" },
  8: { q: "I am a number. Multiply me by 3, then add 9, and get 48. What number am I?", a: 13, difficulty: "hard" },
  9: { q: "A rectangle’s length is twice its width. Its perimeter is 36. What are the length and width?", a: [12,6], difficulty: "hard" },
  10:{ q: "Three consecutive numbers add up to 36. What is the middle number?", a: 12, difficulty: "hard" }
};

let current = 1;
let attempts = 0;
let timerInterval;
let timeLeft = 7*60; // default 7 min

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("submitBtn").addEventListener("click", submitAnswer);
document.getElementById("restartBtn").addEventListener("click", resetGame);

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
      document.getElementById("restartBtn").classList.remove("hidden");
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
      document.getElementById("restartBtn").classList.remove("hidden");
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
    1:"3 × 4 = ?",
    2:"12 ÷ 3 = ?",
    3:"5 × 6 = ?",
    4:"(Answer ×2) + 5 = 17",
    5:"Two consecutive numbers sum to 27. Larger number = ?",
    6:"(Answer ÷3) + 7 = 16",
    7:"3 × ? -5 =16",
    8:"3 × ? +9 =48",
    9:"Perimeter=2(L+W), L=2×W. Enter as length,width",
    10:"Three consecutive numbers sum to 36. Find the middle one"
  };
  return hints[n] || "No hint available.";
}

function resetGame(){
  clearInterval(timerInterval);
  current = 1;
  timeLeft = parseInt(document.getElementById("timerSelect").value) * 60;
  document.getElementById("answer").disabled = false;
  document.getElementById("game").classList.add("hidden");
  document.getElementById("intro").classList.remove("hidden");
  document.getElementById("feedback").innerText = "";
  document.getElementById("restartBtn").classList.add("hidden");
}
