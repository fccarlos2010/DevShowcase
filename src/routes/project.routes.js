const express = require('express');

const {
  createProject,
  getProjects
} = require('../controllers/project.controller');

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);

module.exports = router;