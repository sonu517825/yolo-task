// pakkage dependency
const express     = require('express');
const logger      = require('morgan');
const dotenv      = require("dotenv")
const bodyParser  = require('body-parser');

const app         = express();

// app configration
dotenv.config();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// modules dependency
const HttpError   = require('./error/Http_error')

// routers dependency
const Router      = require('./routes/UserRouter')

// app routing

app.use('/api/v1', Router)

// 404 handler
app.use((req, res, next) => {
  throw new HttpError('Can not find this route on SERVER', 404);
});

// error handler
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({ success: false, message: error.message || 'An unknown error occurred!' })
});

module.exports = app;
