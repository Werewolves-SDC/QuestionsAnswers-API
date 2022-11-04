require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

client.connect()
  .then(() => console.log('Successful connection to Postgres DB'))
  .catch((err) => console.log('Unable to connect to Postgres DB'))

module.exports = client;