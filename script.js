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
let timerInterval;
let timeLeft = 7 * 60; // 7 minutes in seconds

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  moveRobotToStation(currentStation);
  showQuestion(currentStation);
  startTimer();
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("feedback").innerText = "⏰ Time's up! Game over!";
      document.getElementById("feedback").className = "wrong";
      document.getElementById("answer").disabled = true;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `Time Left: ${minutes}:${seconds}`;

  // Flash red when <1 minute
  if(timeLeft <= 60) {
    document.getElementById("timer").style.color = "#d32f2f
