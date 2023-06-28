const express = require('express');
const router = express.Router();
const { login, register,logout } = require('./auth.js');

router.post('/register', register);
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password,req,res);
    if (result.error) {
        return res.status(401).json({ error: result.error })
    }
    res.json({ token: result.token })
})
router.get('/logout',logout)

module.exports = router;