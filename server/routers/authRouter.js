const express = require('express');
const argon2 = require('argon2');
const crypto = require('crypto');

const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');

function routes() {
  const authRouter = express.Router();

  //CREATE A NEW USER ACCOUNT
  authRouter.route('/open/signup').post(async (req, res) => {
    let existingUser = await User.findOne({ username: req.body.username });

    if (existingUser === null) {
      let user = new User(req.body);

      console.log('Here');
      let salt = await crypto.randomBytes(32);
      let passwordHash = await argon2.hash(user.password, salt);
      user.password = passwordHash;

      let saveUser = await user.save();

      //for locally we are setting host = "localhost:3000"
      //but later on it will be req.get('host');
      let host = req.get('host');
      host = 'localhost:3000';

      //generate random token and save it
      let randomBuffer = await crypto.randomBytes(48);
      let randomToken = randomBuffer.toString('hex');

      console.log('Random token generated');
      console.log(randomToken);

      let verificationTokenModel = new VerificationToken({
        email: saveUser.email,
        verificationToken: randomToken,
      });

      console.log('Saved model');
      console.log(verificationTokenModel);

      let saveVerificationTokenModel = await verificationTokenModel.save();

      let link =
        'http://' +
        host +
        '/api/verify?email=' +
        saveUser.email +
        '&token=' +
        randomToken;
      let craftedEmail = {
        to: saveUser.username,
        subject: 'Please click on the link to verify the email',
        link: link,
      };
      return res.json({ user: saveUser, craftedEmail: craftedEmail });
    } else {
      res.json({ message: 'Username already exists' });
    }
  });

  //SIGN IN WITH LOCALLY CREATED USER
  authRouter.route('/open/signin').post(async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user !== null) {
      if (user.isVerified === false) {
        return res.status(400).json({
          errorMessage: 'The email for this username is not verified',
        });
      }

      if (user.deactivated === true) {
        return res.status(400).json({
          errorMessage:
            'Your account has been deactivated, Please contact administrator to re-activate your account',
        });
      }

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
        return res.status(400).json({
          errorMessage: 'The password does not match for this user',
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: 'Email does not exist',
      });
    }
  });

  authRouter.route('/verify').get(async (req, res) => {
    let email = req.query.email;
    let token = req.query.token;
    let host = req.get('host');
    host = 'localhost:4200';

    let user = await User.find({ email: email });

    if (!user) {
      return res.json({ message: 'No User exists for this email' });
    }

    if (user.isVerified === true) {
      return res.json({ message: 'User is already verified' });
    } else {
      let verificationTokenModel = await VerificationToken.findOne({
        email: email,
      });

      //although this case will never occur
      if (!verificationTokenModel) {
        return res.json({ message: 'No verification token for this email' });
      }

      console.log('database');

      console.log(verificationTokenModel.verificationToken);

      console.log('frontend');
      console.log(token);

      if (verificationTokenModel.verificationToken === token) {
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { isVerified: true }
        );

        res.set('location', 'http://' + host + '/emailverified');
        return res.status(301).send();
      } else {
        return res.json({ message: 'Verification token not correct' });
      }
    }
  });
  return authRouter;
}

module.exports = routes;
