//  Searching Element
let timeShowDiv = document.querySelector(".time-show");
let startButton = document.querySelector(".start-btn");
let buttonContainer = document.querySelector(".button-container");
//  Dynamically create Element
let stopButton = document.createElement("button");
let resumeButton = document.createElement("button");
let resetButton = document.createElement("button");

let timer;
let time = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

function startStopwatch() {
  if (!timer) {
    timer = setInterval(updateDisplay, 1000);
    updateDisplay();
  }
}

function stopStopwatch() {
  clearInterval(timer);
  timer = null;
}

function resetStopwatch() {
  stopStopwatch();
  time.seconds = 0;
  time.minutes = 0;
  time.hours = 0;
  timeShowDiv.textContent = `00:00:00`;
}

function updateDisplay() {
  time.seconds++;
  if (time.seconds === 60) {
    time.seconds = 0;
    time.minutes++;
    if (time.minutes === 60) {
      time.minutes = 0;
      time.hours++;
    }
  }
  timeShowDiv.textContent = `${formatTime(time.hours)}:${formatTime(
    time.minutes
  )}:${formatTime(time.seconds)}`;
}

function formatTime(value) {
  return value < 10 ? "0" + value : value;
}
//  Dynamically create button
function createStopButton() {
  startButton.remove();
  stopButton.classList.add("stop-btn");
  buttonContainer.appendChild(stopButton);
  stopButton.innerText = `Stop`;
  // buttonContainer.appendChild(resetButton);
  // resetButton.innerText = `Reset`;
}

function createResumeButton() {
  stopButton.remove();
  resumeButton.classList.add("resume-btn");
  buttonContainer.appendChild(resumeButton);
  resumeButton.innerText = `Resume`;
}

function createResetButton() {
  resetButton.classList.add("reset-btn");
  buttonContainer.appendChild(resetButton);
  resetButton.innerText = `Reset`;
}

startButton.addEventListener("click", startStopwatch);
startButton.addEventListener("click", createStopButton);
startButton.addEventListener("click", () => {
  // buttonContainer.appendChild(resetButton);
  // resetButton.innerText = `Reset`;
});

stopButton.addEventListener("click", stopStopwatch);
stopButton.addEventListener("click", createResumeButton);
stopButton.addEventListener("click", createResetButton);

resumeButton.addEventListener("click", startStopwatch);
resumeButton.addEventListener("click", () => {
  resumeButton.remove();
  resetButton.remove();
  createStopButton();
});

resetButton.addEventListener("click", resetStopwatch);
resetButton.addEventListener("click", () => {
  resumeButton.remove();
  resetButton.remove();
  buttonContainer.appendChild(startButton);
});
