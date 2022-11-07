// import express
const express = require('express');
// create router
const router = express.Router();

// require controllers
const controllers = require('../controllers/questions.js');

// create routes'

router.get('/questions', controllers.getAllQs);

// get questions '/qa/questions'

// get answers '/qa/questions/:question_id/answers

// post add question '/qa/questions'

// post add answer 'qa/questions/:question_id/answers

// put mark question helpful '/qa/questions/:question_id/helpful'
router.put('/questions/:question_id/helpful', controllers.updateQuestionHelpful);

// put report question '/qa/questions/:question_id/report

// put mark answer helpful '/qa/answers/:answer_id/helpful'

// put report answer '/qa/answers/:answer_id/report'

// export route to use in server
module.exports = router;
