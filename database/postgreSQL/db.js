/* eslint-disable camelcase */
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client
  .connect()
  .then(() => console.log('Successful connection to Postgres DB'))
  .catch((err) => console.log('Unable to connect to Postgres DB'));

// queries

// getQuestions, params: product_id, page, count

// getAnswers, params: question_id, query params: page, count
// const getAnswers = (req, res) => {
//   const {question_id} = req.params;
//   const answerQuery = 'SELECT answer_id, body, date, answerer_name, helpful'
// }

// addQuestion, body params: body, name, email, product_id

// addAnswer, params: question_id, body params: body, name, email, photos

// updateHelpfulQ, params: question_id

// reportQuestion, params: question_id

// updateHelpfulA, params: answer_id

// reportAnswer, params: answer_id

// module.exports = {
//   async query(text, params) {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res;
//   },
// };

module.exports = client;
