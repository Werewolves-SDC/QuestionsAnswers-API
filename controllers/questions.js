/* eslint-disable camelcase */
// import models
const models = require('../models/questions.js');
// take the info from the req and invokes the models
const getAllQs = (req, res) => {
  const { product_id, page, count } = req.query;
  // invoke model to update/request data'
  const questions = { product_id };
  models
    .getAllQuestions(product_id, count, page)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => console.log(err));
};

const addQuestion = (req, res) => {
  models
    .addQuestion(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.sendStatus(400));
};

const updateQuestionHelpful = (req, res) => {
  models
    .updateQHelpful(req.params.question_id)
    .then((data) => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
};

const updateQuestionReport = (req, res) => {
  models
    .updateQReport(req.params.question_id)
    .then((data) => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
};
module.exports = {
  getAllQs,
  addQuestion,
  updateQuestionHelpful,
  updateQuestionReport,
};
