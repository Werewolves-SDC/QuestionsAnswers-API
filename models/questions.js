/* eslint-disable camelcase */
const db = require('../database/postgreSQL/db.js');

module.exports = {
  // use async to return promise + wrap non-promises in func
  getAllQuestions: async (product_id, page, count) => {
    const questionList = {};
    // set query string w/ json aggregate to put into array
    const questionQuery = `SELECT row_to_json(questions) FROM (SELECT question_id, product_id, question_body, question_date, asker_name, reported, question_helpfulness FROM "questions") questions WHERE product_id = ${product_id} AND reported = false `;

    // create questionObjs container
    const questionObjs = [];
    await db
      .query(questionQuery)
      .then((data) => {
        // iterate thru data to push each question obj in questionObjs
        data.rows.forEach((question) => {
          const qObj = question.row_to_json;
          questionObjs.push(qObj);
        });
      })
      .catch((err) => console.log(err));
    // console.log('QUESTION OBJECT', questionObjs);

    // get all answers by mapping over questionObjs to get array of ids to query
    // iterate thru qObjs array, push id into array,  map and query

    const allAnswers = await Promise.all(
      questionObjs.map((question) => {
        const { question_id } = question;
        const answerQuery = `SELECT row_to_json(answers) FROM (SELECT id, question_id, body, date, answerer_name, reported, helpfulness FROM "answers") answers WHERE question_id = ${question_id} AND reported = false`;
        // return query (promise)
        return db.query(answerQuery);
      })
    );

    // console.log('ALL ANSWERS', allAnswers);
    const answerObjs = [];

    const answers = allAnswers.forEach((answer) => answerObjs.push(answer.rows));
    // console.log('ANSWERS OBJECTS', answerObjs);

    // answer in array -> answers and questions = length, use index

    const answerIDs = [];
    questionObjs.forEach((question, index) => {
      const ansObj = {};
      for (let i = 0; i < answerObjs[index].length; i++) {
        const key = answerObjs[index][i].row_to_json.id;
        answerIDs.push(key);
        ansObj[key] = answerObjs[index][i].row_to_json;
      }
      question.answers = ansObj;
    });

    // console.log('ANSWER IDS', answerIDs);

    const allPhotos = await Promise.all(
      answerIDs.map((id, index) => {
        const answer_id = id.toString();
        const photoQuery = `SELECT * FROM answers_photos WHERE answer_id = ${answer_id}`;
        return db.query(photoQuery);
      })
    );

    // console.log('ALL PHOTOS', allPhotos);

    const photoObjs = [];

    const photos = allPhotos.forEach((photo) => photoObjs.push(photo.rows));

    // photoObjs.forEach((photo) => {
    //   const id = photo.answer_id;
    // });
    // console.log('PHOTO OBJS', photoObjs);
    // iterate thru each answer obj and create photos key and assign it to whatever is at the same index w/in photos objects

    answerObjs.forEach((answer, index) => {
      // console.log('PHOTO ARRAY', photoById);
      answer.photos = photoObjs[index];
    });
    // NTS: unable to get photos...

    questionList.product_id = product_id;
    questionList.results = questionObjs;
    return new Promise((res, rej) => res(questionList));
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
