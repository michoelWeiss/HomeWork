import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.end('Hello world!');
});

const server = http.createServer(app);

const io = new Server(server);

let chatters = {};

io.on('connection', socket => {
  let name;

  console.log('got a connection');

  socket.on('login', n => {
    name = n;
    chatters[name] = socket;
    io.emit('msg', `${name} joined the chat.`);
  });

  socket.on('msg', msg => {
    const index = msg.indexOf('@');
    const endIndex = msg.indexOf(' ', index);

    if (index === -1 || endIndex === -1) {
      io.emit('msg', `${name} says: ${msg}`);
    }

    else {
      const targetName = msg.slice(index + 1, endIndex);
      console.log(chatters);
      if (chatters[targetName]) {
        msg = msg.slice(0, index) + msg.slice(endIndex);
        chatters[targetName].emit('msg', `PRIVATE Message From @${name} - ${msg}`)
      }
      else { io.emit('msg', `Was that a private message? Recipient could not be found. Please try again. `); }
    }
  });

  socket.on('disconnect', socket => {
    io.emit('msg', `${name} left the chat.`);
  });

});




server.listen(80);
