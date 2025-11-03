const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/ingest', adminController.ingestData);
router.get('/metrics', adminController.getMetrics);

module.exports = router;