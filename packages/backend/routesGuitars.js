const express = require('express');
const router = express.Router();
const { addGuitar, showGuitars } = require('./guitars')

router.post('/add', addGuitar)
router.get('/show', showGuitars)

module.exports = router