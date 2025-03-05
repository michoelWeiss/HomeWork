import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import Authentication from './routes/authentication.js';
import Posts from './routes/posts.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: 'http://localhost:5173'
});

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 20000
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:5173'
}));

const uri = 'mongodb://localhost:27017';
app.use(async (req, res, next) => {
  const client = new MongoClient(uri);
  req.database = client.db('blog');

  req.io = io;

  next();
});

app.use('/', Authentication);
app.use('/posts', Posts);

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.end(err.message);
});

io.on('connection', () => {
  console.log('got socket.io connection');
});

server.listen(8080);
