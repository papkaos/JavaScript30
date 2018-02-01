let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
    }

    displayTimeLeft(secondsLeft)
  }, 1000);

}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const restSecs = seconds % 60;
  const display = `${mins}:${restSecs < 10 ? '0' : ''}${restSecs}`;
  timerDisplay.textContent = display;
  document.title = display;

  console.log(seconds);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();

  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${min < 10 ? '0' : ''}${min}`;
}

function startTimer(e) {
  timer(+this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  timer(+this.minutes.value * 60);
  this.reset();
});