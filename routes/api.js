var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/api/questionsController');

router.get('/questions', questionsController.getAllQuestions);
router.post('/questions', questionsController.createQuestion);
router.get('/questions/:id', questionsController.getOneQuestion);
router.delete('/questions/:id', questionsController.removeQuestion);