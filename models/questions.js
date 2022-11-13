/* eslint-disable camelcase */
const db = require('../database/postgreSQL/db.js');

module.exports = {
  // use async to return promise + wrap non-promises in func
  getAllQuestions: (product_id, page, count) => {
    // set query string w/ json aggregate to put into array
    const questionQuery = `SELECT ${product_id} product_id, json_agg(
      json_build_object(
        'question_id', q.question_id,
        'question_body', q.question_body,
        'question_date', q.question_date,
        'asker_name', q.asker_name,
        'asker_email', q.asker_email,
        'reported', q.reported,
        'answers', (
        SELECT coalesce(json_object_agg (
        a.id, (
          SELECT json_build_object (
          'id', a.id,
          'body', a.body,
          'date', a.date,
          'answerer_name', a.answerer_name,
          'answerer_email', a.answerer_email,
          'helpfulness', a.helpfulness,
           'photos', (
             SELECT coalesce (json_agg(row_to_json(p)), '[]')
             FROM (SELECT id, photo_url from answers_photos p WHERE p.answer_id = a.id) p)
           )
          )
        ),'{}') FROM answers a where a.question_id = q.question_id
      )
    )
   ) as results FROM questions q WHERE q.reported = false and q.product_id = ${product_id}`;

    // create questionObjs container
    return db.query(questionQuery);
  },
  addQuestion: (question) => {
    const values = Object.values(question);

    const addQ = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES ($4, $1, current_timestamp, $2, $3)`;
    return db.query(addQ, values);
  },
  updateQHelpful: (question_id) => {
    const updateHelpful = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id} `;
    return db.query(updateHelpful);
  },

  updateQReport: (question_id) => {
    const updateReport = `UPDATE questions SET reported = true WHERE question_id = ${question_id} `;
    return db.query(updateReport);
  },
};
