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

  reviewRouter.route('/secure/review').get((req, res) => {
    let catalog_nbr = req.query.catalog_nbr;
    let subject = req.query.subject;

    Review.find(
      { catalog_nbr: catalog_nbr, subject: subject },
      (err, reviews) => {
        const returnedReviews = [];
        reviews.forEach((review) => {
          returnedReviews.push(review);
        });
        return res.json(returnedReviews);
      }
    );
  });

  return reviewRouter;
}

module.exports = routes;
