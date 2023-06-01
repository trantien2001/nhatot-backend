import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes/route.js';
import http, { createServer } from 'http';
import { Server } from 'socket.io';
import { errorConverter, errorHandler } from './middlewares/error.js';

dotenv.config();
const app = express();

// app.all('/', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

// socket.io

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
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

const port = process.env.PORT;
// handle error
app.use(errorConverter);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
