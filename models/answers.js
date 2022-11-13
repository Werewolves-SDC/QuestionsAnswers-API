/* eslint-disable camelcase */
const db = require('../database/postgreSQL/db.js');

module.exports = {
  getAnswers: (question_id, page, count) => {
    const ansQuery = `SELECT * FROM answers WHERE question_id = ${question_id}`;
    return db.query(ansQuery);
  },
  addAns: (question_id, answer) => {
    const values = Object.values(answer);
    const addAnsQuery = `INSERT INTO answers (question_id, body, date, answerer_name, answerer_email) VALUES (${question_id}, $1, current_timestamp, $2, $3) RETURNING id`;

    return db.query(addAnsQuery, values);
  },
  addPhotos: (id, photos) => {
    Promise.all(
      photos.map((photo) => {
        const addPhotoQuery = `INSERT INTO answers_photos (answer_id, photo_url) VALUES ${id}, ${photo}`;
        return db.query(addPhotoQuery);
      })
    );
  },
  updateHelpful: (id) => {
    const helpfulQuery = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = ${id}`;
    return db.query(helpfulQuery);
  },
  updateReport: (id) => {
    const reportQuery = `UPDATE answers SET reported = true WHERE id = ${id}`;
    return db.query(reportQuery);
  },
};
