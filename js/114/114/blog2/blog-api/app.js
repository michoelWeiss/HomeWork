import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import Authentication from './routes/authentication.js';
import Posts from './routes/posts.js';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: 'http://localhost:3000'
});

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false,
  /*cookie: {
    maxAge: 20000
  }*/
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

/*app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));*/

await mongoose.connect('mongodb://127.0.0.1:27017/blog');

app.use(async (req, res, next) => {
  req.io = io;

  next();
});

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', Authentication);
app.use('/api/posts', Posts);

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

io.on('connection', () => {
  console.log('got socket.io connection');
});

server.listen(8080);
