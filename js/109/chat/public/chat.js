const socketIo = io();

document.querySelector('#loginForm').addEventListener('submit', e => {
  e.preventDefault();

  socketIo.emit('login', document.querySelector('#nameInput').value);

  e.target.style.display = 'none';
  document.querySelector('#messageContainer').style.display = 'block';
});

const msgInput = document.querySelector('#msgInput');

document.querySelector('#messageForm').addEventListener('submit', e => {
  e.preventDefault();
  socketIo.emit('msg', msgInput.value);
  msgInput.value = '';
});

const messages = document.querySelector('#messages');
socketIo.on('msg', msg => {
  messages.innerHTML += `<div>${msg}</div>`;
});
