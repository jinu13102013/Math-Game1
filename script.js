const stations = {
  1: { q: "Multiply me by 3 and add 12 to get 75. What number am I?", a: 21 },
  2: { q: "The sum of three consecutive numbers is 72. Type the middle one.", a: 24 },
  3: { q: "A rectangle has perimeter 44. Its width is W, length is 2W+4. What is W?", a: 6 },
  4: { q: "Half of a number plus 7 equals 25. What’s the number?", a: 36 },
  5: { q: "I am 3 times as old as my sister. Together we are 48. How old am I?", a: 36 },
  6: { q: "Find the next number: 2, 4, 8, 16, … ?", a: 32 },
  7: { q: "I have $50. I buy 5 pencils at $3 each. How much left?", a: 35 },
  8: { q: "I am divisible by 3 and 5 and less than 50. Name one number.", a: [15,30,45] },
  9: { q: "Double a number and subtract 10 to get 50. What’s the number?", a: 30 },
  10:{ q: "If 24 candies are shared among 6 kids, how many per kid?", a: 4 }
};

let current = 1;
let attempts = 0;
let timerInterval;
let timeLeft = 7*60;

function startGame(){
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
  document.getElementById("question").innerText = stations[n].q;
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
    1:"75-12=63, divide by 3.",
    2:"72 ÷ 3 = middle number.",
    3:"Perimeter = 2*(L+W).",
    4:"Half the number = 18.",
    5:"Equation: Me+Sis=48, Me=3*Sis",
    6:"Powers of 2.",
    7:"Total spent = 15.",
    8:"Multiples of 3 and 5.",
    9:"Add 10, then halve.",
    10:"24 ÷ 6."
  };
  return hints[n] || "No hint available.";
}
