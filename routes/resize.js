const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({"resize": "test"});
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;