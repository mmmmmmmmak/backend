const { response } = require('express');
var express = require('express');
var router = express.Router();
const app = express();
const { User, createUser, getUserData } = require('./routes/src/panels/mongo.js');
const bodyParser = require('body-parser');
const { parse } = require('querystring');
const crypto = require('crypto');
const cors = require('cors');
const url = require('url')

const { useImperativeHandle } = require('react');

/* GET users listing. */
// app.get('/', (req, res) => {

//   res.send('Successful response.');

// });
// app.listen(3000, () => console.log('Example app is listening on port 3000.'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

  app.all('/saveUserWallet', async (req, res) => {
    let urlRequest = url.parse(req.url, true)
    wallett = urlRequest.query.wallet
    console.log(urlRequest.query.wallet)

    let userid = 0
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    })
    req.on('end', async () => {
      const urlParams = parse(body);
      userid = urlParams.vk_user_id
      res.end('ok')
    })

    const client = await User.find({ user_id: userid });
    const data = client[0];
    if (!data) {

          const newUser = new User({
              user_id: userid,
              wallet: wallett,
          });
  
          return newUser.save((error) => {
  
              if (error) {
                  return res.statusCode(500).send('Internal Server Error');
              }
  
          });
        }

});

var server = app.listen(process.env.PORT);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

var roomno = 1;

// io.on('connection', (socket) => {
//   socket.on('rooms', (no) => {
//     console.log('client wallet is:', no);
//     socket.emit('room', 1);
//   });
//   // client.join("room-"+roomno);
//   // //Send this event to everyone in the room.
//   // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
//   // client.leave("room-"+roomno);
// });


// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);

let port = process.env.PORT
app.listen(3000, () => console.log('My port is: ' + port))

module.exports = router;
