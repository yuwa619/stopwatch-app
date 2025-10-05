// Get display elements
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

// Get button elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");

// Get container elements
const body = document.getElementsByTagName("body")[0];
const lapsList = document.getElementById("lapsList");

// Initialize time variables
let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let interval; // To store the setInterval ID
let lapCounter = 1;

// --- Event Listeners for buttons ---
startButton.onclick = start;
stopButton.onclick = stop;
resetButton.onclick = reset;
lapButton.onclick = recordLap;

/**
 * Starts the stopwatch.
 */
function start() {
  clearInterval(interval);
  interval = setInterval(updateTime, 10);
  startButton.disabled = true;
  stopButton.disabled = false;
  lapButton.disabled = false;
  body.classList.remove("stopped-state");
}

/**
 * Stops the stopwatch.
 */
function stop() {
  clearInterval(interval);
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
  body.classList.add("stopped-state");
}

/**
 * Resets the stopwatch.
 */
function reset() {
  clearInterval(interval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapCounter = 1;
  updateDisplay();
  lapsList.innerHTML = ""; // Clear the laps
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
  body.classList.remove("stopped-state");
}

/**
 * Records the current time as a lap.
 */
function recordLap() {
  const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
    seconds
  )}:${formatTime(milliseconds)}`;
  const li = document.createElement("li");
  li.className = "lap-box";
  li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${lapTime}</span>`;
  // append to order from earliest to latest
  lapsList.append(li);
  lapCounter++;
}

/**
 * Updates the time values.
 */
function updateTime() {
  milliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

/**
 * Updates the HTML display with the current time values.
 */
function updateDisplay() {
  // Milliseconds need to be handled slightly differently to show 2 digits
  millisecondsElement.textContent = String(milliseconds).padStart(2, "0");
  secondsElement.textContent = formatTime(seconds);
  minutesElement.textContent = formatTime(minutes);
  hoursElement.textContent = formatTime(hours);
}

/**
 * Formats a number to have a leading zero if it's less than 10.
 */
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Initialize button states on load
stopButton.disabled = true;
lapButton.disabled = true;
