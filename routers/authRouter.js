const express = require('express');
const User = require('../models/User');

function routes() {
  const authRouter = express.Router();

  //Method to create a local user
  authRouter.route('/signUp').post(async (req, res) => {
    let existingUser = await User.findOne({ username: req.body.username });
    if (existingUser === null) {
      let user = new User(req.body);
      let saveUser = await user.save();
      return res.send(saveUser);
    } else {
      res.send('Username already exists');
    }
  });

  return authRouter;
}

module.exports = routes;
