const mongoose = require('mongoose');

// establish connection
const db = mongoose.connect('mongodb://localhost:27017/questionsAnswersdb')
  .then(() => 'Connection established')
  .catch((err) => console.log(err))

// create schema
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  product_id: Number,
  question_body: {
    type: String,
    required: true,
    maxLength: 1000
  },
  question_date: {
    type: Date,
    default: date.now
  },
  asker_name: {
    type: String,
    required: true,
    maxLength: 60
  },
  question_helpfulness: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  }
});

const Questions = mongoose.model('Questions', questionsSchema);

const answersSchema = new Schema({
  question_id: {type: Schema.Types.ObjectId, ref: 'Questions'}
  body: {type: String, required: true, maxLength: 1000},
  date: {type: Date, default: Date.now},
  answerer_name: {type: String, required: true, maxLength: 60},
  helpfulness: {type: Number, default: 0},
  photos: [photosSchema]
});

const Answers = mongoose.model('Answers', answersSchema);

const photosSchema = new Schema ({
  answer_id: {type: Schema.Types.ObjectId, ref: 'Answers'},
  url: {type: String, required: true}
});

const Photos = mongoose.model('Photos', photosSchema);

module.exports = {
  Questions,
  Answers,
  Photos
}
