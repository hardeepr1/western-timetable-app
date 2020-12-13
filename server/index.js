const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const courseRouter = require('./routers/courseRouter')();
const courseListRouter = require('./routers/courseListRouter')();
const reviewRouter = require('./routers/reviewRouter')();
const adminRouter = require('./routers/adminRouter')();
const authRouter = require('./routers/authRouter')();
const userRouter = require('./routers/userRouter')();
const passportRouter = require('./routers/passportRouter')();

const authMiddleWare = require('./authmiddleware');

const Course = require('./models/Course');

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);

console.log(dbUrl);
const port = process.env.PORT;

const app = express();

//setup middleware for body parser
app.use(bodyParser.json());
app.use('/api/secure', authMiddleWare.checkAuthentication);

app.use('/', express.static('../client/timetable-app/dist/timetable-app'));

app.use('/api', [
  courseRouter,
  courseListRouter,
  reviewRouter,
  adminRouter,
  authRouter,
  userRouter,
]);

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
