const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authKey = 'SECRET';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '603509445190-4scltni2l7644scuqrq3dd4u6njih9hn.apps.googleusercontent.com',
      clientSecret: '8nqnvYXweOIB0Cn8sr13si97',
      callbackURL: 'http://localhost:3000/passport/auth/google/callback',
    },
    (token, refreshToken, profile, done) => {
      return done(null, {
        profile: profile,
        token: token,
      });
    }
  )
);

function google_login(req, res, next) {
  let email = req.user.profile.emails[0].value;
  let payload = { email: email, admin: false };
  let jwtToken = jwt.sign(payload, authKey);

  const responseObject = {
    token: jwtToken,
    username: email,
    isAdmin: false,
  };

  return res.json(responseObject);
}

function routes() {
  const passportRouter = express.Router();

  passportRouter.use(passport.initialize());

  passportRouter
    .route('/passport/auth/google/callback')
    .get(passport.authenticate('google'), google_login);

  passportRouter.route('/api/passport/auth/google').get(
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    })
  );

  return passportRouter;
}

module.exports = routes;
