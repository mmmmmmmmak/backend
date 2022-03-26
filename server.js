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
    // const ordered = {};

    // Object.keys(urlParams).sort().forEach((key) => {
    //     if (key.slice(0, 3) === 'vk_') {
    //         ordered[key] = urlParams[key];
    //     }
    // });
    
    // const stringParams = qs.stringify(ordered);
    // const paramsHash = crypto
    // .createHmac('sha256', config.secretKey)
    // .update(stringParams)
    // .digest()
    // .toString('base64')
    // .replace(/\+/g, '-')
    // .replace(/\//g, '_')
    // .replace(/=$/, '');


    // const user = Number(ordered.vk_user_id);

    // const result = await User.find({ user_id: user });
    // const data = result[0];

    // if (!data) {

    //     const newUser = new User({
    //         user_id: user,
    //         money: 2000,
    //     });

    //     return newUser.save((error) => {

    //         if (error) {
    //             return res.statusCode(500).send('Internal Server Error');
    //         }

    //     });

    // }


});

app.listen(process.env.PORT || 3000, () => console.log('My port is: 3000.'))

module.exports = router;
