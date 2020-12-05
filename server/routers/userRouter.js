const express = require('express');
const User = require('../models/User');

//todo error handling for all the cases
function routes() {
  const userRouter = express.Router();

  userRouter.route('/secure/users').get((req, res) => {
    User.find({}, (err, users) => {
      const returnedUsers = [];
      users.forEach((user) => {
        returnedUsers.push(user);
      });
      return res.json(returnedUsers);
    });
  });

  //Update specific field only
  userRouter.route('/secure/users').put(async (req, res) => {
    const users = req.body;
    users.forEach(async (user) => {
      const id = user._id;
      const udpated = { isAdmin: user.isAdmin, deactivated: user.deactivated };
      const updatedUser = await User.findByIdAndUpdate(id, udpated);
    });
    return res.json('Users are updated');
  });
  return userRouter;
}

module.exports = routes;
