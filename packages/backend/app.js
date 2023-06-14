const express = require('express');
const app = express();

require('dotenv').config();

const knex = require('./knex');
const utils = require('./utils');

app.use('/storage', express.static('storage/public'));

app.get('/', (req, res) => {
  return utils.sendResponse({res, message: 'Im working!'});
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('App Name API by freely.digital');
  console.log(`App listening on port ${port}.`);
});