/* eslint-disable camelcase */
// import models
const models = require('../models/questions.js');
// take the info from the req and invokes the models
const getAllQs = (req, res) => {
  const { product_id } = req.query;
  // invoke model to update/request data'
  models
    .getAllQuestions(product_id)
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
};

// const addQuestion = (req, res) => {
//   // get the product id
//   const {product_id} = req.query;
//   // get the info from body to insert

// }

// const addAnswer = (req, res) => {

// }

const updateQuestionHelpful = (req, res) => {
  // get question id
  const { question_id } = req.params.question_id;
  // invoke model
  models
    .updateQHelpful(question_id)
    .then((data) => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
};

module.exports = {
  getAllQs,
  updateQuestionHelpful,
};
