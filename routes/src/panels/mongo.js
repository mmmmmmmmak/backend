const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://kluvzza:qwerQ777@cluster0.mfkof.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true,
      useUnifiedTopology: true },
    function (err) {
      if (err) throw err;
  
      console.log("Successfully connected");
    }
  );

/* Create a schema */
const Schema = mongoose.Schema;

const getUserData = (user_id) => User.findOne({ user_id });

/* Create a schema */
const userSchema = new Schema({
    user_id: Number,
    wallet: String,
});

/* Create a model */
const User = mongoose.model('User', userSchema);

const createUser = (user_id, wallet) => {
  let newUser = new User({
    user_id,
    wallet
  });
  newUser.save().then(console.log);
};


module.exports = {
    User,
    getUserData,
    createUser
};