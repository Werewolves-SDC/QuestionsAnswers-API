/* eslint-disable camelcase */
require('dotenv').config();
const { Client } = require('pg');
// const { Pool } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   client.query('SELECT * FROM questions where question_id = 1', (err, result) => {
//     release();
//     if (err) {
//       return console.error('Error executing query', err.stack);
//     }
//     console.log(result.rows);
//   });
// });

// module.exports = pool;
client
  .connect()
  .then(() => console.log('Successful connection to Postgres DB'))
  .catch((err) => console.log('Unable to connect to Postgres DB'));

module.exports = client;

// // pool.connect();
// pool.on('connect', (client) => {
//   console.log('Connected to Postgres DB');
// });

// pool.on('error', (err, client) => {
//   console.log(err, 'Not connected to Postgres DB');
//   process.exit(-1);
// });

// module.exports = {
//   query(text, params) {
//     const res = pool.query(text, params);
//     const duration = Date.now() - start;
//     // console.log('executed query', { text, duration, rows: res.rowCount });
//     return res;
//   },
//   // async getClient() {
//   //   const client = await pool.connect();
//   //   const { query } = client;
//   //   const { release } = client;
//   //   const timeout = setTimeout(() => {
//   //     console.error('A client has been checked out for more than 5 seconds!');
//   //     console.error(`The last executed query on this client was: ${client.lastQuery}`);
//   //   }, 5000);
//   //   // monkey patch the query method to keep track of the last query executed
//   //   client.query = (...args) => {
//   //     client.lastQuery = args;
//   //     return query.apply(client, args);
//   //   };
//   //   client.release = () => {
//   //     // clear our timeout
//   //     clearTimeout(timeout);
//   //     // set the methods back to their old un-monkey-patched version
//   //     client.query = query;
//   //     client.release = release;
//   //     return release.apply(client);
//   //   };
//   //   return client;
//   // },
// };
