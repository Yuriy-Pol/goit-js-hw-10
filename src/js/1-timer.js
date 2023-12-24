import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date and time in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);
let countdownInterval;

function startCountdown(targetDate) {
  document.querySelector('#datetime-picker').disabled = true;
  countdownInterval = setInterval(() => {
    const currentDate = new Date();

    if (currentDate >= targetDate) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      document.querySelector('[data-start]').disabled = true;
      document.querySelector('#datetime-picker').disabled = false;
    } else {
      const timeRemaining = convertMs(targetDate - currentDate);
      updateTimerDisplay(timeRemaining);
    }
  }, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = datePicker.selectedDates[0];

  if (!selectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date and time',
    });
    return;
  }

  startCountdown(selectedDate);
});
