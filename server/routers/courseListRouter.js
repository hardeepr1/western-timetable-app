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
  courseListRouter.route('/open/courselist').get(async (req, res) => {
    let courseLists = await CourseList.find({});
    const returnedCourseLists = [];

    for (const courseList of courseLists) {
      let courses = courseList.get('coursesList');

      for (const courseRef of courses) {
        let catalog_nbr = courseRef.catalog_nbr;
        let subject = courseRef.subject;

        let course = await Course.findOne({
          catalog_nbr: catalog_nbr,
          subject: subject,
        });

        if (course !== null) courseRef.courseDetails = course;
      }

      returnedCourseLists.push(courseList);
    }

    return res.send(returnedCourseLists);
  });

  //CREATES A NEW COURSELIST
  courseListRouter.route('/secure/courselist').post(async (req, res) => {
    const courseList = new CourseList(req.body);
    courseList.set({ lastEditedTime: Date.now() });

    let courseListsCount = await CourseList.count({
      userName: courseList.userName,
    });

    console.log(courseListsCount);

    //Validation if courselist count is greater then 20
    if (courseListsCount >= 20) {
      return res.status(400).json({
        errorMessage:
          'The maximum courselist allowed are 20. Please delete some of the existing course list',
      });
    }

    //validation as name of courselist cannot be empty
    if (courseList.name.length === 0) {
      return res.status(400).json({
        errorMessage: 'The name of the courselist cannot be empty',
      });
    }

    let courseListExisting = await CourseList.findOne({
      name: courseList.name,
    });

    console.log(courseListExisting);

    //validation as name of courselist must be unique
    if (courseListExisting) {
      return res.status(400).json({
        errorMessage: 'The name of the courselist must be unique',
      });
    }

    console.log(courseList);
    courseList.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        successMessage: 'Course List has been created successfully',
      });
    });
  });

  //UPDATE EXISTING COURSELIST
  courseListRouter.route('/secure/courselist/:id').put(async (req, res) => {
    try {
      let id = req.params.id;
      let update = req.body;
      update.lastEditedTime = Date.now();

      // let courseListExisting = await CourseList.find({ name: update.name });

      // //validation as name of courselist must be unique
      // if (courseListExisting) {
      //   return res.status(400).json({
      //     errorMessage: 'The name of the courselist must be unique',
      //   });
      // }

      let updatedCourseList = await CourseList.findOneAndUpdate(
        { _id: id },
        update,
        { new: true }
      );
      return res.json({
        successMessage: 'Course List has been updated successfully',
      });
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
        let returnedCourseLists = {};
        let courseListId = req.params.courseListId;
        let courseList = await CourseList.findOne({ _id: courseListId });
        let courses = courseList.get('coursesList');

        //we need courseListInfo also
        returnedCourseLists['courseListInfo'] = courseList;

        for (const courseRef of courses) {
          let catalog_nbr = courseRef.catalog_nbr.toString();
          let subject = courseRef.subject;
          let group = 'FULL';

          console.log(courseRef);

          if (catalog_nbr.length > 4) {
            group = catalog_nbr.charAt(catalog_nbr.length - 1);
          }

          if (catalog_nbr.length === 4) catalog_nbr = parseInt(catalog_nbr);

          let course = await Course.findOne({
            catalog_nbr: catalog_nbr,
            subject: subject,
          });

          let plainObjectCourse = course.toObject();

          if (courseRef.year) {
            plainObjectCourse.year = courseRef.year;
          } else {
            plainObjectCourse.year = '0';
          }

          if (!(group in returnedCourseLists)) {
            returnedCourseLists[group] = [];
          }

          if (course !== null)
            returnedCourseLists[group].push(plainObjectCourse);
        }

        return res.json(returnedCourseLists);
      } catch (err) {}
    });

  //DELETE AN EXISTING COURSELIST
  courseListRouter
    .route('/secure/courseList/:courseListId')
    .delete((req, res) => {
      let id = req.params.courseListId;
      CourseList.deleteOne({ _id: id }, (err) => {
        if (!err) {
          return res.json({
            successMessage: 'Course List has been deleted successfully',
          });
        } else {
          return res.json('An error has occured');
        }
      });
    });

  return courseListRouter;
}

module.exports = routes;
