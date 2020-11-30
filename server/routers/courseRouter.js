const express = require('express');
const Course = require('../models/Course');

function routes() {
  const courseRouter = express.Router();

  //this code was written testing if all courses are loaded into database
  //method to return all the courses
  //   courseRouter.route('open/courses').get((req, res) => {
  //     Course.find({}, (err, courses) => {
  //       const returnedCourses = [];
  //       courses.forEach((course) => {
  //         returnedCourses.push(course);
  //       });
  //       return res.json(returnedCourses);
  //     });
  //   });

  courseRouter.route('/open/course').get((req, res) => {
    let result = [];
    //subject, catalog_nbr, className , class_section, ssr_component
    let catalog_nbr = req.query.catalog_nbr;
    let subject = req.query.subject;

    //to do regular expression to match any one of them 1021/1021B both
    //for time being matched with both like and is used
    //doubt whether subject will also be case insensitve
    Course.find(
      {
        $and: [
          { catalog_nbr: { $regex: new RegExp(catalog_nbr, 'i') } },
          { subject: { $regex: new RegExp(subject, 'i') } },
        ],
      },
      (err, courses) => {
        const returnedCourses = [];
        courses.forEach((course) => {
          returnedCourses.push(course);
        });
        return res.json(returnedCourses);
      }
    );
  });

  //search course by
  courseRouter.route('/open/searchcourse').get((req, res) => {});
  return courseRouter;
}

module.exports = routes;
