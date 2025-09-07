body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f2f2f2;
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 20px;
}

#game {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

#grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-template-rows: repeat(5, 60px);
  gap: 2px;
  padding: 5px;
  border: 2px solid #222;
  background: #222;
}

.cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px solid #222;
}

.water {
  background: #4da6ff; /* blue water */
}

.land {
  background: #66cc66; /* green land */
}

.station {
  background: #ffcc33; /* yellow stations */
}

.robot {
  font-size: 28px;
}

#panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  max-width: 250px;
}

#panel input {
  width: 80%;
  padding: 5px;
  font-size: 16px;
  margin: 5px 0;
}

#panel button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

#feedback {
  margin-top: 10px;
  font-weight: bold;
}

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
