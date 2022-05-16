const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizC');
const isAuth = require('../middleware/isAuth');

router.get('/:quiz', isAuth, quizController.quizRender);

module.exports = router;