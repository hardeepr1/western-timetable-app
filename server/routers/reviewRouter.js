const express = require('express');
const Review = require('../models/Review');

//todo error handling for all the cases
function routes() {
  const reviewRouter = express.Router();

  //ADD A REVIEW FOR COURSE ID(subject and catalog_nbr)
  reviewRouter.route('/secure/review').post((req, res) => {
    const review = new Review(req.body);
    review.userName = 'hardeepr1';
    review.set({ reviewTime: Date.now() });

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
      { catalog_nbr: catalog_nbr, subject: subject, hidden: false },
      (err, reviews) => {
        const returnedReviews = [];
        reviews.forEach((review) => {
          returnedReviews.push(review);
        });
        return res.json(returnedReviews);
      }
    );
  });

  reviewRouter.route('/secure/reviews').get(async (req, res) => {
    let reviews = await Review.find({ hidden: false });
    return res.json(reviews);
  });

  reviewRouter.route('/secure/reviews').post(async (req, res) => {
    try {
      const reviews = req.body;
      reviews.forEach(async (review) => {
        const id = review._id;
        const udpated = { hidden: review.hidden };
        const updatedReview = await Review.findByIdAndUpdate(id, udpated);
      });
      return res.json({
        successMessage: 'Reviews are updated successfully',
      });
    } catch (err) {
      return res.status(400).json({
        errorMessage: 'An unexpected error on server side',
      });
    }
  });

  return reviewRouter;
}

module.exports = routes;
