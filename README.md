# Image Formatter Microservice
This is the repository for formatting an image provided by the user.

The microservice supports three image-processing operations using the Sharp library:

1. Resize an image
2. Crop an image
3. Convert an image between PNG and JPEG formats

The microservice is built with Node.js, Express.js, and Sharp.

For more information on Sharp, please check out this link: https://sharp.pixelplumbing.com/api-output/#_top


# Requesting Data

The microservice communicates over HTTP using POST requests and multipart form data.

The client must provide: An uploaded image file using the field name `img`

## Resize Endpoint: POST/resize
Resizing an image. Sharp saves the image as bytes using toBuffer(). The resized buffer will be sent back to the user to download.

Fields required are a img (file), width, and height. Please use numbers, otherwise you will get an error!

Example:
1. Upload a photo either in .png, jpeg, or jpg
2. Provide a width
3. Provide a height

## Crop Endpoint: POST/crop
The crop operation extracts a region of the input image, saving in the same format. Specify the width, height, and optional offsets to control the cropping area. Sharp will save the image using toBuffer() into bytes in memory for cropping, which will get sent back to the user.

Fields required are a img (file), left, top, width, height. Please use numbers, otherwise you will get an error. 

Example:
1. Upload an image to crop a desired section
2. Provide a number for the left offset
3. Provide a number for the top offset
4. Give a width as a number
5. Give a height as a number

## Convert Endpoint: POST/convert
Output to a given format.

Fields required are a img (file) and toImgType, which is a text of png, jpg, or jpeg.

Example:
1. Upload an image
2. toImgType will be either a .png, .jpg, or .jpeg



# Receiving Data
After processing, the microservice returns the modified image as binary data in the HTTP response.

Example:

# UML Sequence Diagram:
