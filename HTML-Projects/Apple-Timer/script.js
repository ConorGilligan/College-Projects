let time = 60;
let timerInterval = null;

const timerText = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

timerText.textContent = time;

function updateTimer() {
  timerText.textContent = time;

  if (time <= 15) {
    timerText.classList.add("warning");
  } else {                   // If time is 15 seconds or less, add warning style
    timerText.classList.remove("warning");
  }

  if (time === 0) {
    clearInterval(timerInterval);
    alert("Time up, Time to take a braek.");
    resetTimer();
    return;
  }
  time--;
}

function startTimer() {        //start the timer
  timerInterval = setInterval(updateTimer, 1000);   // Run updatetimer every 1  second
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  stopBtn.disabled = false;             // Enable pause and stop buttons
}

function pauseTimer() {
  if (pauseBtn.textContent === "Pause") {
    clearInterval(timerInterval);
    pauseBtn.textContent = "Resume";
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    pauseBtn.textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  time = 60;                    // Reset time to 60 seconds
  timerText.textContent = time;
  timerText.classList.remove("warning");

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  pauseBtn.textContent = "Pause";
}



startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);        // Add event listeners to buttons
stopBtn.addEventListener("click", resetTimer);