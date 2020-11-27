const express = require('express');
const Review = require('../models/Review');

function routes() {
  const reviewRouter = express.Router();

  //just simple route need to error handling
  //methid to add review for give course
  reviewRouter.route('/secure/review').post((req, res) => {
    const review = new Review(req.body);
    review.save((err) => {
      if (!err) {
        res.send(review);
      }
    });
  });

  return reviewRouter;
}

module.exports = routes;
