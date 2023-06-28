const express = require('express');
const router = express.Router();
const { addGuitar } = require('./guitars')

router.post('/add', addGuitar)

module.exports = router