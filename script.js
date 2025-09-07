// Island grid: 0 = water, 1 = land, "S1"-"S4" = stations
const islandGrid = [
  [0, 1, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [1, 0, "S1", 0, 1],
  [1, 1, 0, "S2", 1],
  [0, 1, "S3", 1, "S4"]
];

// Robot starting position
let robot = { x: 1, y: 0 };
let currentStation = null;
let stationIndex = 0;

const stations = {
  "S1": { q: "I am a number. Multiply me by 2 and add 3 to get 11. What am I?", a: 4 },
  "S2": { q: "Divide me by 3 and subtract 2 to get 4. What am I?", a: 18 },
  "S3": { q: "Next in the sequence: 2, 4, 8, 16, ?", a: 32 },
  "S4": { q: "Add 7 to me to get 20. What am I?", a: 13 }
};

// Predefined path (robot moves through land and stations)
const path = [
  { x:1, y:0 }, { x:1, y:1 }, { x:2, y:1 }, { x:2, y:2 }, // S1
  { x:3, y:2 }, { x:3, y:3 }, // S2
  { x:2, y:4 }, // S3
  { x:4, y:4 }  // S4
];

let pathIndex = 0;

const grid = document.getElementById("grid");
const questionElem = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");

// Draw island grid
function drawGrid() {
  grid.innerHTML = "";
  for (let y = 0; y < islandGrid.length; y++) {
    for (let x = 0; x < islandGrid[0].length; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      const value = islandGrid[y][x];
      if (value === 0) cell.classList.add("water");
      else if (typeof value === "number" || value === 1) cell.classList.add("land");
      else if (typeof value === "string" && value.startsWith("S")) cell.classList.add("station");

      if (robot.x === x && robot.y === y) {
        cell.innerHTML = "🤖";
        cell.classList.add("robot");
      }

      grid.appendChild(cell);
    }
  }
}

// Start Game
function startGame() {
  robot = { x: 1, y: 0 };
  pathIndex = 0;
  stationIndex = 0;
  currentStation = null;
  feedback.innerText = "";
  questionElem.innerText = "Robot started! Move to first station.";
  drawGrid();
  moveAlongPath();
}

// Reset Game
function resetGame() {
  robot = { x: 1, y: 0 };
  pathIndex = 0;
  stationIndex = 0;
  currentStation = null;
  questionElem.innerText = "Press Start to begin!";
  feedback.innerText = "";
  drawGrid();
}

// Ask station riddle
function askRiddle(station) {
  currentStation = stations[station];
  questionElem.innerText = currentStation.q;
}

// Check answer
function checkAnswer() {
  if (!currentStation) return;

  const user = parseInt(answerInput.value);
  if (user === currentStation.a) {
    feedback.innerText = "✅ Correct!";
    currentStation = null;
    answerInput.value = "";
    moveAlongPath();
  } else {
    feedback.innerText = "❌ Wrong! Try again.";
  }
}

// Move robot along path
function moveAlongPath() {
  if (pathIndex >= path.length) {
    questionElem.innerText = "🎉 Robot finished all stations!";
    feedback.innerText = "";
    return;
  }

  const nextPos = path[pathIndex];
  robot.x = nextPos.x;
  robot.y = nextPos.y;
  drawGrid();

  const cellValue = islandGrid[robot.y][robot.x];
  if (typeof cellValue === "string" && cellValue.startsWith("S")) {
    askRiddle(cellValue);
    stationIndex++;
    pathIndex++;
  } else {
    pathIndex++;
    setTimeout(moveAlongPath, 800); // move every 0.8s for animation
  }
}

// Initial draw
drawGrid();


  drawGrid();
}

drawGrid();
