var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.get("/js/*", function(req, res) {
  var file = req.url.substring(1);
  res.sendfile(file);
});

app.get("/assets/*", function(req, res) {
  var file = req.url.substring(1);
  res.sendfile(file);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


io.on('connection', function(socket){
  socket.on('game_event', function(msg){
    io.emit('game_event', msg);
    //console.log('game_event: ' + msg);
  });
});

var server = http.listen(3000, function() {
    console.log("Listening on port %d", server.address().port);
});

