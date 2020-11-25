const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

const dbUrl = 'mongodb://localhost:27017/timeTableApp';
mongoose.connect(dbUrl);

const app = express();
const port = 3000;

//setup middleware for body parser
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/signUp', (req, res) => {
  let user = new User(req.body);

  console.log(user);
  user.save((err) => {
    res.send(user);
  });
});

app.listen(port, () => {
  console.log('Listening at port ${port}');
});
