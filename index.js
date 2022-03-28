const express = require("express")
var app = express();
var server = app.listen(4000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

var roomno = 1;

io.on('connection', (socket) => {
  socket.on('rooms', (no) => {
    console.log('client wallet is:', no);
    socket.emit('room', 1);
  });
  // client.join("room-"+roomno);
  // //Send this event to everyone in the room.
  // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
  // client.leave("room-"+roomno);
});


const port = 8000;
io.listen(process.env.PORT || port);
console.log('listening on port ', port);
