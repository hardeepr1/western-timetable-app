const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

const User = require('./models/User');
const Course = require('./models/Course');

const dbUrl = 'mongodb://localhost:27017/timeTableApp';
mongoose.connect(dbUrl);

const app = express();
const port = 3000;

//setup middleware for body parser
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Course.find({}, (err, courses) => {
    const returnedCourses = [];
    courses.forEach((course) => {
      returnedCourses.push(course);
    });
    return res.json(returnedCourses);
  });
});

app.post('/signUp', (req, res) => {
  let user = new User(req.body);

  console.log(user);
  user.save((err) => {
    res.send(user);
  });
});

Course.count({}, function (err, result) {
  console.log(result);

  if (result === 0) {
    let rawData = fs.readFileSync('../Lab3-timetable-data.json');
    let jsonData = JSON.parse(rawData);
    console.log('here' + jsonData.count());
    jsonData.forEach((element) => {
      let course = new Course(element);
      course.save();
    });
  }
});

app.listen(port, () => {
  console.log('Lstening at port ${port}');
});
