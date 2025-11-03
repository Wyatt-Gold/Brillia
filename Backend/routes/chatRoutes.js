const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/start', chatController.startSession);
router.post('/:sessionId/message', chatController.sendMessage);
router.get('/:sessionId/history', chatController.getHistory);

module.exports = router;