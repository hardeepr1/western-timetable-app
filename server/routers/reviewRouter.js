const express = require('express');
const Review = require('../models/Review');

//todo error handling for all the cases
function routes() {
  const reviewRouter = express.Router();

  //ADD A REVIEW FOR COURSE ID(subject and catalog_nbr)
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
