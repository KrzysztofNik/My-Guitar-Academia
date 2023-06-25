const express = require('express');
const router = express.Router();
const { login, register } = require('./auth.js');

router.post('/register', register);
router.post('/login', async (req, res) => {
    const { Email, password } = req.body;
    const result = await login(Email, password,req,res);
    if (result.error) {
        return res.status(401).json({ error: result.error })
    }
    res.json({ token: result.token })
})

module.exports = router;