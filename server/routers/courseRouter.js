const express = require('express');
const Course = require('../models/Course');
const Review = require('../models/Review');
var stringSimilarity = require('string-similarity');

function routes() {
  const courseRouter = express.Router();

  //this code was written testing if all courses are loaded into database
  //method to return all the courses
  courseRouter.route('/open/courses').get((req, res) => {
    Course.find({}, (err, courses) => {
      const returnedCourses = [];
      courses.forEach((course) => {
        returnedCourses.push(course);
      });
      return res.json(returnedCourses);
    });
  });

  //COURSE LIST CREATE DATA
  courseRouter.route('/secure/courses').get(async (req, res) => {
    const courses = await Course.find({}).select('catalog_nbr subject');
    return res.json(courses);
  });

  courseRouter.route('/open/courseid').get(async (req, res) => {
    let result = [];

    let catalog_nbr = req.query.catalog_nbr;
    let subject = req.query.subject;

    //to do regular expression to match any one of them 1021/1021B both
    //for time being matched with both like and is used
    //doubt whether subject will also be case insensitve
    const returnedCourses = [];

    const courses = await Course.find({
      $and: [
        { catalog_nbr: { $regex: new RegExp(catalog_nbr, 'i') } },
        { subject: { $regex: new RegExp(subject, 'i') } },
      ],
    });

    for (const courseRef of courses) {
      let plainCourseObejct = courseRef.toObject();

      let catalog_nbr = plainCourseObejct.catalog_nbr;
      let subject = plainCourseObejct.subject;

      let reviews = await Review.find({
        catalog_nbr: catalog_nbr,
        subject: subject,
      });

      if (plainCourseObejct !== null) plainCourseObejct.reviews = reviews;

      returnedCourses.push(plainCourseObejct);
    }

    return res.json(returnedCourses);
  });

  //search course by key
  courseRouter.route('/open/searchcourse').get(async (req, res) => {
    const returnedCourses = [];

    let search_keyword = req.query.search_keyword;
    const courses = await Course.find({});

    for (const courseRef of courses) {
      let plainCourseObejct = courseRef.toObject();

      var catalog_nbr = plainCourseObejct.catalog_nbr.toString();
      var className = plainCourseObejct.className.toString();

      var classNameSimilarity = stringSimilarity.compareTwoStrings(
        search_keyword,
        className
      );

      var catalogNbrSimilarity = stringSimilarity.compareTwoStrings(
        search_keyword,
        catalog_nbr
      );

      if (catalogNbrSimilarity > 0.3 || classNameSimilarity > 0.3) {
        returnedCourses.push(plainCourseObejct);
      }
    }

    return res.json(returnedCourses);
  });
  return courseRouter;
}

module.exports = routes;
