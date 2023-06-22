const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registerRouter = require('./register');
const { Model } = require("objection");
const cors = require('cors');
const login = require('./login.js')

require('dotenv').config();

const knex = require('./knex');

Model.knex(knex);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = User.query().findById(user.id);

        next()
    })
}

app.use('/storage', express.static('storage/public'));
app.use(bodyParser.json());
app.use(cors())
app.use('/', registerRouter);
app.post('/login', async (req, res) => {
    const { Email, password } = req.body;
    const result = await login(Email, password);
    if (result.error) {
        return res.status(401).json({ error: result.error })
    }
    res.json({ token: result.token })
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('App Name API by freely.digital');
    console.log(`App listening on port ${port}.`);
});
