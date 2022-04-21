const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Socket Connected...');

  socket.on('send_message', data => {
    socket.broadcast.emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});