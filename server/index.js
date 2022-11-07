// create server for postgres
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/questions.js');

const app = express();

// parsing
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/qa', routes);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
