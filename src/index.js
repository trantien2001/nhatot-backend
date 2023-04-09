const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const route = require('./routes/route');
var cors = require('cors');

// socket.io
const server = require('http').createServer(app);

const { Server } = require('socket.io');
exports.io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

exports.io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);
  // });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use('/', express.static('public/images/avatars'));

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

route(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

