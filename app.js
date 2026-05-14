const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');


const app = express();


app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());


// Routes
  // /upload
  // /resize
  // -- /crop
  // -- /convert

const upload = require('./routes/upload');
const resize = require('./routes/resize')
const crop = require('./routes/crop')
const convert = requires('./routes/convert')

app.use('/upload', upload)
app.use('/resize', resize)
app.use('./crop', crop)
app.use('./convert', convert)

module.exports = app;