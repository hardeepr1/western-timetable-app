const express = require('express');
const argon2 = require('argon2');
const crypto = require('crypto');

const User = require('../models/User');

function routes() {
  const authRouter = express.Router();

  const host, rand;
  //CREATE A NEW USER ACCOUNT
  authRouter.route('/open/signup').post(async (req, res) => {
    let existingUser = await User.findOne({ username: req.body.username });
    if (existingUser === null) {
      let user = new User(req.body);
      let salt = await crypto.randomBytes(32);

      let passwordHash = await argon2.hash(user.password, salt);
      user.password = passwordHash;

      
      let saveUser = await user.save();

      rand = Math.floor(Math.random() * 100 + 24);
      host = req.get('host');
      console.log(host);

      //for locally we are setting host = "localhost:3000"
      //but later on it will be req.get('host');
      host = 'localhost:3000';
      let link =
        'http://localhost:3000/api/verify?username=' +
        saveUser.username +
        '&id=' +
        rand;
      let craftedEmail = {
        to: saveUser.username,
        subject: 'Please click on the link to verify the email',
        link: link,
      };
      return res.json({ user: saveUser, craftedEmail: craftedEmail });
    } else {
      res.send('Username already exists');
    }
  });

  //SIGN IN WITH LOCALLY CREATED USER
  authRouter.route('/open/signin').post(async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user !== null) {
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

  authRouter.route('/verify').get(async (req, res) => {
    let userName = req.query.username;
    let uniqueId = req.query.id;
    const updatedUser = await User.findOneAndUpdate(
      { username: userName },
      { isVerified: true }
    );
  });
  return authRouter;
}

module.exports = routes;
