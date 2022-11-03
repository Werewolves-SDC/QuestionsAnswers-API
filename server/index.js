// create server for postgres
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database/db');

const app = express();

// parsing
app.use(express.json());

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);