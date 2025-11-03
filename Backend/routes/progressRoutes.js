const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/', progressController.showProgress);
router.get('/roadmap', progressController.getRoadmap);

module.exports = router;