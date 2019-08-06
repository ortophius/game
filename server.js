var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Server = require('./server/server.js')

app.use(express.static('dist'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
  });

io.on('connection', function(socket){
  let server = new Server(socket)
});

http.listen(3000, function(){
  console.log('listening on *:80');
});

