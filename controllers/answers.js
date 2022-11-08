/* eslint-disable camelcase */
// import models
const models = require('../models/answers.js');

const getAllAnswers = (req, res) => {
  // get question id
  const { question_id } = req.params;
  const { page, count } = req.query;
  const ansObj = { question: question_id, page, count };

  models
    .getAnswers(question_id)
    .then((data) => {
      ansObj.results = data.rows.slice(0, count);
      res.status(200).json(ansObj);
    })
    .catch((err) => res.status(400).send('Unable to get answers'));
};
const addAnswer = (req, res) => {
  const { photos } = req.body;
  console.log('PHTOS', photos);
  models
    .addAns(req.params.question_id, req.body)
    // .then((data) => {
    //   // console.log('HERE', data.rows[0].id);
    //   const { id } = data.rows;
    //   // console.log('PHOTOS', photos);
    //   // console.log('ID', id);
    //   models.addPhotos(id, photos);
    // })
    .then(() => res.status(201).send('Successful addition'))
    .catch((err) => res.status(400).send('Unable to add answer'));
};

const updateAnsHelpful = (req, res) => {
  models
    .updateHelpful(req.params.answer_id)
    .then(() => res.status(204).send('Helpful count incremented'))
    .catch((err) => res.status(400).send('Unable to increment helpful count'));
};
const updateAnsReport = (req, res) => {
  models
    .updateReport(req.params.answer_id)
    .then(() => res.status(204).send('Answer reported'))
    .catch(() => res.status(400).send('Unable to report answer'));
};
module.exports = {
  getAllAnswers,
  addAnswer,
  updateAnsHelpful,
  updateAnsReport,
};
