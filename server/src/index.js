// server.js
import bodyParser from 'body-parser';
import express from 'express';

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

import './config/mongodb.config';
import employeeRouter from './routes/employee.routes';
import uploadsRouter from './routes/uploads.routes';

const app = express();
const PORT = 8080;


app.use(logger('dev'));

// Our DB Configuration
// require('./src/database');

// Routes
// const postRouter = require('./routes/post.routes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());


// Server API's
app.use('/api/employees', employeeRouter);
app.use('/api/uploads', uploadsRouter);

app.get('/', (req, res) => {
  res.status(200).send('API Gateway in development');
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});

export default app;
