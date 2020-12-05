const express = require('express');
const Course = require('../models/Course');
const CourseList = require('../models/CourseList');

function routes() {
  const courseListRouter = express.Router();

  //GET A COURSELIST BY ID
  courseListRouter.route('/secure/courselist/:id').get((req, res) => {
    let id = req.params.id;
    CourseList.findOne({ _id: id }, (err, courseList) => {
      return res.json(courseList);
    });
  });

  //METHOD TO GET ALL COURSELISTS
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
    console.log(courseList);
    //for time being it is hard coded
    courseList.set({ userName: 'hardeepr1' });
    courseList.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.send(courseList);
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

  //for time being it is open can be changed later on
  courseListRouter
    .route('/open/timetable/:courseListId')
    .get(async (req, res) => {
      try {
        let returnedCourseLists = [];
        let courseListId = req.params.courseListId;
        let courseList = await CourseList.findOne({ _id: courseListId });
        let courses = courseList.get('coursesList');

        //why does not work for foreach strange
        for (const courseRef of courses) {
          let catalog_nbr = courseRef.catalog_nbr;
          let subject = courseRef.subject;

          let course = await Course.findOne({
            catalog_nbr: catalog_nbr,
            subject: subject,
          });

          if (course !== null) returnedCourseLists.push(course);
        }
        return res.send(returnedCourseLists);
      } catch (err) {}
    });

  //DELETE AN EXISTING COURSELIST
  //TODO: PARAMETER CAN BE ID
  courseListRouter
    .route('/secure/courseList/:courseListId')
    .delete((req, res) => {
      let id = req.params.courseListId;
      CourseList.deleteOne({ _id: id }, (err) => {
        if (!err) {
          return res.json('Delete successfull');
        } else {
          return res.json('An error has occured');
        }
      });
    });

  return courseListRouter;
}

module.exports = routes;
