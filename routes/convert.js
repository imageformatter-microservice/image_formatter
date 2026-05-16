const express = require('express');
const sharp = require('sharp');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({"convert": "test"});
  } catch (error) {
    next(error);
  }
  
});


// ROUTE /convert to convert image:
// TO: png or jpeg
// FROM: png, jpg, or jpeg
router.post('/', async function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "img") is used to retrieve the uploaded file
  let img = req.files.img;
  let fromImgType = img.mimetype
  let toImgType = req.body.toImgType

  if (process.env == 'dev') {
      console.log("from IMG TYPE: " + fromImgType)
      console.log("to IMG TYPE: " + toImgType)
  }

  // only allow converting from and to jpeg/png
  if (toImgType != 'jpg' && toImgType != 'jpeg' && toImgType != 'png' )
    res.status(403).send("only converting to png and jpeg at this time, sorry.") 

  if (img.mimetype != 'image/jpg' && img.mimetype != 'image/jpeg' && img.mimetype != 'image/png' )
  res.status(403).send("only converting from png and jpeg at this time, sorry") 


  // Send back converted image buffer as response
  convertedImg = sharp(img.data).toFormat(toImgType)
  await convertedImg
    .toBuffer((err, convertedBuffer) => {
      if (err) {
        console.log(err)
      } else {
        sharp(convertedBuffer).metadata()
        //Tells Express what type of file this is
        res.set('Content-Type', req.body.toImgType)
        //Sends the resized buffer to client (ex. Insomnia or main program)
        res.send(convertedBuffer);
      }
  });

});

module.exports = router;