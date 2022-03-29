const { User, createUser, getUserData } = require('./routes/src/panels/mongo.js');
const { parse } = require('querystring');
const url = require('url')
const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

var roomno = 1;

io.on('connection', (socket) => {
  socket.on('mywalletis', (no) => {
    console.log('client wallet is:', no);
    socket.emit('wallet', no);
  });
  socket.on('login', async (wallet, id) => {
    console.log('client wallet is:', wallet);
    let find_id = url.parse(id, true)
    let idisfinds = find_id.query.vk_user_id
    console.log('client id is:', idisfinds)
    const client = await User.find({ user_id: idisfind });
    const data = client[0];
    if (!data) {

          const newUser = new User({
              user_id: idisfinds,
              wallet: wallet,
          });
            
        console.log('user +1')
          return newUser.save((error) => {
  
              if (error) {
                  return res.statusCode(500).send('Internal Server Error');
              }
  
          });
        }
  });
  // client.join("room-"+roomno);
  // //Send this event to everyone in the room.
  // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
  // client.leave("room-"+roomno);
});


const port = 8000;
io.listen(process.env.PORT || port);
console.log('listening on port ', port);
