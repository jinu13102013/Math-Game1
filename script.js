const gridSize = 5;
let robot = { x: 0, y: 0, dir: "E" }; // Start at top-left, facing East
let currentStep = 0;
let currentAnswer = 0;

const moves = [
  "forward", "left", "forward", "left", "forward",
  "right", "forward", "right", "forward", "stop"
];

// Build grid
const grid = document.getElementById("grid");
function drawGrid() {
  grid.innerHTML = "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (x === robot.x && y === robot.y) {
        cell.innerHTML = "🤖";
      }
      grid.appendChild(cell);
    }
  }
}

function startGame() {
  robot = { x: 0, y: 0, dir: "E" };
  currentStep = 0;
  askQuestion();
  drawGrid();
}

function resetGame() {
  document.getElementById("question").innerText = "Press Start to begin!";
  document.getElementById("answer").value = "";
  robot = { x: 0, y: 0, dir: "E" };
  drawGrid();
}

function askQuestion() {
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  currentAnswer = a + b;
  document.getElementById("question").innerText = `What is ${a} + ${b}?`;
}

function checkAnswer() {
  const user = parseInt(document.getElementById("answer").value);
  if (user === currentAnswer) {
    moveRobot();
    askQuestion();
  } else {
    alert("❌ Wrong! Try again.");
  }
  document.getElementById("answer").value = "";
}

function moveRobot() {
  const action = moves[currentStep];
  currentStep++;
  if (!action) return;

  if (action === "forward") {
    if (robot.dir === "E") robot.x++;
    else if (robot.dir === "W") robot.x--;
    else if (robot.dir === "N") robot.y--;
    else if (robot.dir === "S") robot.y++;
  } else if (action === "left") {
    robot.dir = { N: "W", W: "S", S: "E", E: "N" }[robot.dir];
  } else if (action === "right") {
    robot.dir = { N: "E", E: "S", S: "W", W: "N" }[robot.dir];
  } else if (action === "stop") {
    alert("🎉 Robot finished the course!");
  }

  drawGrid();
}

drawGrid();
