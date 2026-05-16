const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = express.Router();
const sharp = require('sharp');

router.get('/', async (req, res, next) => {
  try {
    res.json({"crop": "test"});
  } catch (error) {
    next(error);
  }
  
});


router.post('/', function(req, res) {
  let img;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "img") is used to retrieve the uploaded file
  img = req.files.img;

  //Grab left, top, width and height numbers from client
  let width = Number(req.body.width)
  let height = Number(req.body.height)
  let left = Number(req.body.left)
  let top = Number(req.body.top)

  if (width < 0 || height < 0 || left < 0 || top < 0) {
    return res.status(400).send('No negative numbers allowed.');

  } else if (isNaN(req.body.width) || isNaN(req.body.height) || isNaN(req.body.left) || isNaN(req.body.top)) {
    return res.status(400).send('No letters or special characters allowed.');

  } else {
    let imgObj = sharp(img.data)
    console.log("Sharp object created.")

    //Save file type into a variable
    let imgType = img.mimetype

    //Use Sharp method .resize() to resize an image
    // let resizedImg = imgObj.resize(width, height)

    //Use a Sharp method .extract() to crop the object
    let croppedImg = imgObj.extract ({
                                      left: left,
                                      top: top,
                                      width: width,
                                      height: height
                                    })

    //Convert to a buffer = Instead of saving the actual resized image. We want the image in memory in bytes.
    croppedImg.toBuffer((err, croppedBuffer) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Buffer callback successful.')
          sharp(croppedBuffer).metadata()
              //User sharp to grab meta data of new resized object
              .then(function(metadata) {
                    console.log('The crop started at left: ', left)
                    console.log('The crop started at top: ', top)
                    console.log('Here is the new width: ', metadata.width)
                    console.log('Here is the new height: ', metadata.height)
                });
          //Tells Express what type of file this is
          res.set('Content-Type', imgType)
          //Sends the resized buffer to client (ex. Insomnia or main program)
          res.send(croppedBuffer);
        }
    });
  }

  if(process.env.environment === 'dev') {
    console.log('This is the user uploaded image path\n', uploadPath)
    
    //Check file type
    console.log('This is the image uploaded by user type\n', img.mimetype)

    //Image bytes that Sharp needs.
    console.log(img.data)

    console.log("Image resized")
  }
});

module.exports = router;