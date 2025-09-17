// Robot path positions (x,y in pixels relative to map)
const path = [
  { x: 50,  y: 80 },   // Start
  { x: 200, y: 140 },  // Station 1
  { x: 300, y: 200 },  // Station 2
  { x: 420, y: 260 },  // Station 3
  { x: 500, y: 330 }   // Station 4
];

// Station riddles (number answers only)
const stations = {
  1: { q: "Station 1: Multiply 3 by 3.", a: 9 },
  2: { q: "Station 2: What is 25 - 7?", a: 18 },
  3: { q: "Station 3: Next in sequence: 5, 10, 20, ? ", a: 40 },
  4: { q: "Station 4: Divide 81 by 9.", a: 9 }
};

let robot = document.getElementById("robot");
let questionElem = document.getElementById("question");
let answerInput = document.getElementById("answer");
let feedback = document.getElementById("feedback");
let progressElem = document.getElementById("progress");

let currentStation = 0;

// Start the game
function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("hud").classList.remove("hidden");
  
  currentStation = 0;
  moveRobot();
}

// Move robot to next station or along path
function moveRobot() {
  if (currentStation >= path.length) {
    questionElem.innerText = "🎉 Congratulations! You finished the island!";
    feedback.innerHTML = "🏆 Great job, explorer!";
    return;
  }

  // Move robot to new position
  robot.style.left = path[currentStation].x + "px";
  robot.style.top = path[currentStation].y + "px";

  // Trigger bounce animation
  robot.classList.remove("bounce");       // reset animation
  void robot.offsetWidth;                 // force reflow
  robot.classList.add("bounce");          // start bounce

  // Check if current position is a station
  if (stations[currentStation]) {
    let st = stations[currentStation];
    questionElem.innerText = st.q;
    progressElem.innerText = `Station: ${currentStation}/4`;
  } else {
    progressElem.innerText = `Station: ${currentStation}/4`;
    currentStation++;
    setTimeout(moveRobot, 1000);
  }
}

// Check user answer
function checkAnswer() {
  if (!stations[currentStation]) return;

  const user = parseInt(answerInput.value);
  if (isNaN(user)) {
    feedback.innerText = "⚠️ Enter numbers only!";
    feedback.className = "wrong";
    return;
  }

  if (user === stations[currentStation].a) {
    feedback.innerText = "✅ Correct!";
    feedback.className = "correct";
    answerInput.value = "";
    currentStation++;
    setTimeout(moveRobot, 1000);
  } else {
    feedback.innerText = "❌ Wrong! Try again.";
    feedback.className = "wrong";
  }
}
