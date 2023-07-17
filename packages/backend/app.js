const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Model } = require("objection");
const cors = require('cors');
const knex = require('./knex');
const routesAuth = require('./routesAuth');
const routesGuitar = require('./routesGuitars');
const cookieParser = require('cookie-parser')

require('dotenv').config();

Model.knex(knex);

app.use('/storage', express.static('storage/public'));
app.use(bodyParser.json());
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/auth', routesAuth);
app.use('/guitar', routesGuitar);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('App Name API by freely.digital');
    console.log(`App listening on port ${port}.`);
});
