const express = require('express');
const CourseList = require('../models/CourseList');

function routes() {
  const courseListRouter = express.Router();

  //all the course list routes goes here in this section
  courseListRouter.route('/secure/courselist').get((req, res) => {
    CourseList.find({}, (err, courseLists) => {
      const returnedCourseLists = [];
      courseLists.forEach((courseList) => {
        returnedCourseLists.push(courseList);
      });
      return res.json(returnedCourseLists);
    });
  });

  //method to create a new course list
  courseListRouter.route('/secure/courselist').post((req, res) => {
    //for time being assuming everything is coming in the body
    //just really simple thing is done so far
    const courseList = new CourseList(req.body);
    courseList.save((err) => {
      res.send(courseList);
    });
  });

  //method to delete a courselist by the name
  courseListRouter.route('/secure/courseList/:name').delete((req, res) => {
    let name = req.params.name;
    CourseList.deleteOne({ name: name }, (err) => {
      if (!err) {
        res.send('Delete successfull' + name);
      }
    });
  });

  return courseListRouter;
}

module.exports = routes;
