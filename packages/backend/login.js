const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');

function generateAccessToken(user) {
    return jwt.sign({ id: user.id, Email: user.Email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
async function login(Email,password) {
    try {
        const user = await User.query().findOne({ Email: Email });
        if (!user) {
            return { error: 'Nieprawidlowy email lub haslo' };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Nieprawidlowy email lub haslo' };
        }

        const token = generateAccessToken(user);
        return { token };
    }
    catch (error) {
        consol.error('Blad logowania', error);
        return { error: 'Wystopil blad podczas logowania' };
    }
}

module.exports = login;

