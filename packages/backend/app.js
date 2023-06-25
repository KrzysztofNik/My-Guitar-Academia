const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Model } = require("objection");
const cors = require('cors');
const knex = require('./knex');
const routes = require('./routes');
const cookieParser = require('cookie-parser')

require('dotenv').config();

Model.knex(knex);

app.use('/storage', express.static('storage/public'));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());
app.use('/auth', routes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('App Name API by freely.digital');
    console.log(`App listening on port ${port}.`);
});
