var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat_message', function(msg) {
    console.log(msg);
    io.emit('chat_message', msg);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listen on *:3000');
});