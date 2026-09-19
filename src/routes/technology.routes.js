const express = require('express');

const {
  createTechnology,
  getTechnologies
} = require('../controllers/technology.controller');

const router = express.Router();

router.post('/', createTechnology);
router.get('/', getTechnologies);

module.exports = router;