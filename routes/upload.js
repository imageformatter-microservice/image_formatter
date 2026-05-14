const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({"upload": "test"});
  } catch (error) {
    next(error);
  }
  
});

router.post('/', function(req, res) {
  let img;
  let uploadPath;
  console.log("Test UploadPath")

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "img") is used to retrieve the uploaded file
  img = req.files.img;
  uploadPath = path.join(__dirname , '..' , 'temp', img.name);

  console.log(uploadPath)

  // Use the mv() method to place the file somewhere on your server
  img.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router;