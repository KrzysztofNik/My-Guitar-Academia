const express = require('express');
const app = express();
const User = require('./models/User.js');
const bodyParser = require('body-parser');
const registerRouter = require('./register');
const { Model } = require("objection");
const cors = require('cors');

require('dotenv').config();

const knex = require('./knex');

Model.knex(knex);

app.use('/storage', express.static('storage/public'));
app.use(bodyParser.json());
app.use(cors())
app.use('/',registerRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('App Name API by freely.digital');
    console.log(`App listening on port ${port}.`);
});
