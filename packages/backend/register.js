const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('./models/User')

router.post('/', async (req, res) => {
    try {
        let { Name, Surname, Email, password } = req.body;
        password = bcrypt.hashSync(password, 8)
        await User.query().insert({ Name, Surname, Email, password });
        return res.status(200).json({ message: 'U¿ytkownik zarejestrowany pomyslnie'});
    }
    catch(error){
        console.error('B³¹d podczas rejestracji u¿ytkownika:', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas rejestracji u¿ytkownika.' });
    }
});

module.exports = router;