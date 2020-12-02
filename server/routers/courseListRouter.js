const express = require('express');
const Course = require('../models/Course');
const CourseList = require('../models/CourseList');

function routes() {
  const courseListRouter = express.Router();

  //GET ALL THE COURSELISTS
  courseListRouter.route('/secure/courselist').get((req, res) => {
    CourseList.find({}, (err, courseLists) => {
      const returnedCourseLists = [];
      courseLists.forEach((courseList) => {
        returnedCourseLists.push(courseList);
      });
      return res.json(returnedCourseLists);
    });
  });

  //CREATES A NEW COURSELIST
  courseListRouter.route('/secure/courselist').post((req, res) => {
    //for time being assuming everything is coming in the body
    //just really simple thing is done so far
    const courseList = new CourseList(req.body);
    courseList.set({ lastEditedTime: Date.now() });
    //for time being it is hard coded
    courseList.set({ userName: 'hardeepr1' });
    courseList.save((err) => {
      if (err) {
        res.send(err);
      }
      res.send(courseList);
    });
  });

  //UPDATE EXISTING COURSELIST
  courseListRouter.route('/secure/courselist/:id').put(async (req, res) => {
    try {
      let id = req.params.id;
      let update = req.body;
      update.lastEditedTime = Date.now();
      let updatedCourseList = await CourseList.findOneAndUpdate(
        { _id: id },
        update,
        { new: true }
      );
      res.send(updatedCourseList);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  //DELETE AN EXISTING COURSELIST
  //TODO: PARAMETER CAN BE ID
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
