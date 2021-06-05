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
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.on('chat-message', (message) => {
    console.log('message: ', message);

    io.emit('chat-message', message);
  });
});