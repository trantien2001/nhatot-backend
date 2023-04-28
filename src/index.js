import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes/route.js';
const app = express();
const port = 8000;

// socket.io
import { createServer } from 'http';
import { Server } from 'socket.io';
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// // socket.io
// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('new_message', (data) => {
    console.log('received message from client:', data);
    io.emit('re-render message', data);
  });
  socket.on('new_follow', (data) => {
    console.log('new follow: ', data);
    io.emit('follow', data);
  });
  socket.on('un_follow', (data) => {
    console.log('un follow: ', data);
    io.emit('unfollow', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.use('/', express.static('public/images/'));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routes(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
