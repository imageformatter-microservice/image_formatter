const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({"convert": "test"});
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;