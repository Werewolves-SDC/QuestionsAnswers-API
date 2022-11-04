// create server for postgres
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database/postgreSQL/db.js');

const app = express();

// parsing
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);