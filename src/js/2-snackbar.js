import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  const delayInput = this.elements.delay;
  const delay = parseInt(this.elements.delay.value, 10);
  const state = this.elements.state.value;

  const notification = document.getElementById('notification');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    delay => {
      displayNotification(`✅ Fulfilled promise in ${delay}ms`, 'fulfilled');
    },
    delay => {
      displayNotification(`❌ Rejected promise in ${delay}ms`, 'rejected');
    }
  );
  delayInput.value = '';
});

function displayNotification(message, state) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = state;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
