const express = require('express');
const argon2 = require('argon2');
const crypto = require('crypto');

const User = require('../models/User');

function routes() {
  const authRouter = express.Router();

  //CREATE A NEW USER ACCOUNT
  authRouter.route('/signup').post(async (req, res) => {
    let existingUser = await User.findOne({ username: req.body.username });
    if (existingUser === null) {
      let user = new User(req.body);
      let salt = await crypto.randomBytes(32);

      let passwordHash = await argon2.hash(user.password, salt);
      user.password = passwordHash;

      let saveUser = await user.save();
      return res.send(saveUser);
    } else {
      res.send('Username already exists');
    }
  });

  //SIGN IN WITH LOCALLY CREATED USER
  authRouter.route('/signin').post(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let user = await User.findOne({ username: username });

    if (user === null) {
      let passwordMatches = await argon2.verify(user.password, password);
      if (passwordMatches) {
        const jwtToken = user.generateJWTToken();
        const responseObject = {
          token: jwtToken,
          username: user.username,
          isAdmin: user.isAdmin,
        };

        return res.json(responseObject);
      } else {
        return res.send('Password is not matching');
      }
    } else {
      return res.send('Username does not exist');
    }
  });

  return authRouter;
}

module.exports = routes;
