const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Server = require('./server/server.js');

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket) {
  new Server(socket);
});

http.listen(3000, function() {
  console.log('listening on *:80');
});

