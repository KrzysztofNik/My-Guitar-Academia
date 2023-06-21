const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt')
const User = require('./models/User')

function generateAccessToken(user) {
    return jwt.sign({ id:user.id,Email:user.Email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

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

router.post('/', async (req, res) => {
    try {
        console.log(1);
        let { Name, Surname, Email, password } = req.body;
        password = bcrypt.hashSync(password, 8)
        await User.query().insert({ Name, Surname, Email, password });
        //const token = generateAccessToken(Name);
        //res.json(token);
        return res.status(200).json({ message: 'U¿ytkownik zarejestrowany pomyslnie' });
        console.log(2)
    }
    catch(error){
        console.error('B³¹d podczas rejestracji u¿ytkownika:', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas rejestracji u¿ytkownika.' });
    }
});

module.exports = router;