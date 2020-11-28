const e = require('express');
const express = require('express');

const Review = require('../models/Review');
const User = require('../models/User');

function routes() {
  const adminRouter = express.Router();

  //MARK REVIEW AS HIDDEN
  adminRouter.route('/admin/review/:id').put(async (req, res) => {
    try {
      let id = req.params.id;
      let review = await Review.findById(id);

      review.hidden = req.body.hidden;

      let updatedReview = await review.save();
      res.send(updatedReview);
    } catch (error) {
      res.send(error);
    }
  });

  //DEACTIVATE OR ACTIVATE THE ACCOUNT
  adminRouter.route('/admin/deactivate/:username').put(async (req, res) => {
    try {
      let username = req.params.username;
      let active = req.body.active;

      let existingUser = await User.find({ username: username });
      if (existingUser) {
        existingUser.active = active;
        let updatedUser = await existingUser.save();
        return res.send(updatedUser);
      } else {
        return res.send('Username does not exist');
      }
    } catch (error) {
      res.send('An error has occurred');
    }
  });
  return adminRouter;
}

module.exports = routes;
