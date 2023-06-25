const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');


const generateTokens = async (req, res, user, onlyAccessToken = false) => {
    try {
        const payload = { id: user.id, Email: user.Email };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m'}
        );
        const refreshToken = !onlyAccessToken ? jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '480m' }
        ) : null;

        await User.query().findOne({ Email: user.Email }).patch({ refreshToken });

        await res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge:  30 * 60 * 1000
        });

        if (refreshToken) {
            await res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 480  * 60 * 1000
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const getTokens = async (req) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accessToken || refreshToken) {
        return { accessToken, refreshToken };
    }

    return null;
}

const getUser = async (req, res, next) => {
    const authTokens = await getTokens(req);

    if (!authTokens) {
        return { user: null, authTokens: null };
    }

    try {
        jwt.verify(authTokens.accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.query().findById(authTokens.Id);

        if (!user) {
            throw new Error('Provided user in token payload is invalid or not found.');
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            try {
                jwt.verify(authTokens.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await User.query().findById(authTokens.userId);

                await generateTokens(req, res, user, true);

                return { user, authTokens };
            } catch (error) {
                return { user: null, authTokens: null };
            }
        }
    }
    return { user: null, authTokens: null };
};


const login = async(Email, password,req,res) => {
    try {
        const user = await User.query().findOne({ Email: Email });
        if (!user) {
            return { error: 'Nieprawidlowy email lub haslo' };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Nieprawidlowy email lub haslo' };
        }
        await generateTokens(req, res, user);
        return true;
    }
    catch (error) {
        console.error('Blad logowania', error);
        return { error: 'Wyst¹pi³ b³¹d podczas logowania' };
    }
}

const register = async (req,res) => {
    try {
        let { Name, Surname, Email, password } = req.body;
        password = bcrypt.hashSync(password, 8);
        await User.query().insert({ Name, Surname, Email, password });
        return res.status(200).json({ message: 'U¿ytkownik zarejestrowany pomyslnie' });
    }
    catch (error) {
        console.error('B³¹d podczas rejestracji u¿ytkownika:', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas rejestracji u¿ytkownika.' });
    }
}

module.exports = { generateTokens, getUser, login, register }