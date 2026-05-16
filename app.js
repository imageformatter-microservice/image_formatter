require('dotenv').config()
console.log(process.env.environment)


const express = require('express');
// const morgan = require('morgan');
// const helmet = require('helmet');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');



const app = express();
const port = 5080

// app.use(helmet());
// app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(fileUpload())

// Routes
// const upload = require('./routes/upload');
const resize = require('./routes/resize');
const crop = require('./routes/crop');
const convert = require('./routes/convert');

// app.use('/upload', upload)
app.use('/resize', resize)
app.use('/crop', crop)
app.use('/convert', convert)

app.listen(port, () => {
  console.log(`Listening on ${port}\n`)
})

module.exports = app;

