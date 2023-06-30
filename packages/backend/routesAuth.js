const express = require('express');
const router = express.Router();
const { login, register, logout, getUser } = require('./auth.js');

router.post('/register', register);
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password,req,res);
    if (result.error) {
        return res.status(401).json({ error: result.error });
    }
    res.json({ token: result.token });
})
router.get('/logout', logout);
router.get('/isLoggedin', async (req, res) => {
    try {
        const { user } = await getUser(req, res, () => { });
        if (!user) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(false);
    }
})

module.exports = router;