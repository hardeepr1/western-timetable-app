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

  //MARK A REVIEW HIDDEN
  reviewRouter.route('/admin/review/:id').put(async (req, res) => {
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
  return reviewRouter;
}

module.exports = routes;
