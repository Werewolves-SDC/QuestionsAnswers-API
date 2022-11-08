// import express
const express = require('express');
// create router
const router = express.Router();

// require controllers
const qControllers = require('../controllers/questions.js');

const aControllers = require('../controllers/answers');

// create routes'

// get questions '/qa/questions'
router.get('/questions', qControllers.getAllQs);

router.post('/questions', qControllers.addQuestion);

// put mark question helpful '/qa/questions/:question_id/helpful'
router.put('/questions/:question_id/helpful', qControllers.updateQuestionHelpful);

// put report question '/qa/questions/:question_id/report
router.put('/questions/:question_id/report', qControllers.updateQuestionReport);

// get answers '/qa/questions/:question_id/answers
router.get('/questions/:question_id/answers', aControllers.getAllAnswers);

// post add answer 'qa/questions/:question_id/answers
router.post('/questions/:question_id/answers', aControllers.addAnswer);

// put mark answer helpful '/qa/answers/:answer_id/helpful'

router.put('/answers/:answer_id/helpful', aControllers.updateAnsHelpful);

// put report answer '/qa/answers/:answer_id/report'
router.put('/answers/:answer_id/report', aControllers.updateAnsReport);
// export route to use in server
module.exports = router;
