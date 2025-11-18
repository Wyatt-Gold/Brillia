const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/:userId', progressController.getUserProgress);
router.post('/update', progressController.updateUserProgress);
router.get('/:userId/roadmap', progressController.getRoadmap);

module.exports = router;