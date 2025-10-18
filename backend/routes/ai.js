//backend\routes\ai.js
const express = require('express');
const router = express.Router();
const {
  summarizeTasks,
  askQuestion
} = require('../controllers/aiController');

router.get('/summarize/:projectId', summarizeTasks);
router.post('/ask', askQuestion);

module.exports = router;