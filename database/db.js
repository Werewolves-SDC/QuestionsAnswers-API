require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 5432,
});

const questionQuery = `CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR (1000) NOT NULL,
  date_written TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW (),
  asker_name VARCHAR (60) NOT NULL,
  asker_email VARCHAR (60) NOT NULL,
  helpful INTEGER DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT FALSE
);`;

client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.log(err))



client.query(questionQuery, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Questions table is successfully created');
  client.end();
});