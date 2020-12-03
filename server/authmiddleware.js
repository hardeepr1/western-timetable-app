const jwt = require('jsonwebtoken');

function checkAuthentication(req, res, next) {
  let token = req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, 'secret', (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.json({
          success: false,
          message: 'Invalid token',
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).send('missing authorization header');
  }
}

module.exports = {
  checkAuthentication: checkAuthentication,
};
