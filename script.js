// Harder riddles (number answers only)
const stations = {
  1: { q: "Multiply me by 3 and add 12 to get 75. What number am I?", a: 21 },
  2: { q: "The sum of three consecutive numbers is 72. Type the middle one.", a: 24 },
  3: { q: "A rectangle has perimeter 44. Its width is W, length is 2W+4. What is W?", a: 6 },
  4: { q: "Half of a number plus 7 equals 25. What’s the number?", a: 36 },
  5: { q: "I am 3 times as old as my sister. Together we are 48. How old am I?", a: 36 },
  6: { q: "Find the next number: 2, 4, 8, 16, … ?", a: 32 },
  7: { q: "I have $50. I buy 5 pencils at $3 each. How much left?", a: 35 },
  8: { q: "I am divisible by 3 and 5 and less than 50. Name one number.", a: [15, 30, 45] },
  9: { q: "Double a number and subtract 10 to get 50. What’s the number?", a: 30 },
  10: { q: "If 24 candies are shared among 6 kids, how many per kid?", a: 4 }
};

// Track progress
let currentStation = 1;
let attempts = 0;

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  moveRobotToStation(currentStation);
  showQuestion(currentStation);
}

function moveRobotToStation(stationNum) {
  const robot = document.getElementById("robot");
  const station = document.getElementById("station" + stationNum);

  robot.style.left = station.style.left;
  robot.style.top = station.style.top;

  // bounce effect
  robot.classList.add("bounce");
  setTimeout(() => robot.classList.remove("bounce"), 600);
}

function showQuestion(stationNum) {
  const q = stations[stationNum].q;
  document.getElementById("question").innerText = q;
  document.getElementById("progress").innerText = `Station ${stationNum} of ${Object.keys(stations).length}`;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  attempts = 0;
}

function submitAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value.trim());
  const correct = stations[currentStation].a;

  attempts++;

  // Handle multiple possible answers
  const isCorrect = Array.isArray(correct) ? correct.includes(userAnswer) : userAnswer === correct;

  if (isCorrect) {
    document.getElementById("feedback").innerText = "✅ Correct!";
    document.getElementById("feedback").className = "correct";
    document.getElementById("station" + currentStation).classList.add("correct-station");

    if (currentStation < Object.keys(stations).length) {
      currentStation++;
      setTimeout(() => {
        moveRobotToStation(currentStation);
        showQuestion(currentStation);
      }, 1000);
    } else {
      document.getElementById("feedback").innerText = "🎉 You finished the Math Map!";
    }
  } else {
    let feedback = "❌ Wrong! Try again.";
    if (attempts >= 3) {
      feedback += " 💡 Hint: " + giveHint(currentStation);
    }
    document.getElementById("feedback").innerText = feedback;
    document.getElementById("feedback").className = "wrong";
  }
}

// Hints for each station
function giveHint(stationNum) {
  const hints = {
    1: "Reverse: 75 - 12 = 63. Then divide by 3.",
    2: "Divide 72 by 3 to get the middle number × 3.",
    3: "Perimeter formula = 2(L+W).",
    4: "Think: Half the number = 18.",
    5: "Equation: Me + Sis = 48 and Me = 3×Sis.",
    6: "It’s powers of 2.",
    7: "Total spent = 15.",
    8: "Think of common multiples of 3 and 5.",
    9: "Work backwards: Add 10, then halve.",
    10: "24 ÷ 6."
  };
  return hints[stationNum] || "No hint available.";
}
