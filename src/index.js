const express = require('express');
const { createServer } = require('http');
const path = require('path')
const { Server } = require('socket.io')

const app = express();
const httpServer = createServer(app);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

httpServer.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});



const io = new Server(httpServer)
io.on('connection', (socket) => {
  io.emit('user-connected', {
    id: socket.id,
    message: 'a user connected',
  })

  socket.on('disconnect', () => {
    io.emit('user-disconnected', {
      id: socket.id,
      message: 'user disconnected',
    })
  })

  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);
  });
});