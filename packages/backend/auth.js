const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const cookieParser = require('cookie-parser');


const generateTokens = async (req, res, user, onlyAccessToken = false) => {
    try {
        const payload = { id: user.id, email: user.email };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m'}
        );
        const refreshToken =  !onlyAccessToken ? jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '480m' }
        ) : null;
        await User.query().findOne({ email: user.email }).patch({ refreshToken });

        await res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge:  30 * 60 * 1000
        });

        if (refreshToken) {
            await res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
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
        const decodedTokenA = jwt.verify(authTokens.accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.query().findById(decodedTokenA.id);
        if (!user) {
            throw new Error('Provided user in token payload is invalid or not found.');
        }

        return { user, authTokens };

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            try {
                decodedTokenR = jwt.verify(authTokens.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await User.query().findById(decodedTokenR.id);

                await generateTokens(req, res, user, true);

                return { user, authTokens };
            } catch (error) {
                return { user: null, authTokens: null };
            }
        }
    }
    return { user: null, authTokens: null };
};


const login = async(email,password,req,res) => {
    try {
        const user = await User.query().findOne({ email: email });
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
        let { name, surname, email, password } = req.body;
        password = bcrypt.hashSync(password, 8);
        await User.query().insert({ name, surname, email, password });
        return res.status(200).json({ message: 'U¿ytkownik zarejestrowany pomyslnie' });
    }
    catch (error) {
        console.error('B³¹d podczas rejestracji u¿ytkownika:', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas rejestracji u¿ytkownika.' });
    }
}

const logout = async (req, res) => {

    const authTokens = await getTokens(req);
    if (!authTokens) {
        return res.status(401).json({ error: 'U¿ytkownik niezalogowany' });
    }

    try {
        const decodedTokenA = jwt.verify(authTokens.accessToken, process.env.ACCESS_TOKEN_SECRET);
        await User.query().findById(decodedTokenA.id).patch({ refreshToken: null });
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'U¿ytkownik wylogowany pomyœlnie' });
    }
    catch (error){ 
        console.error('B³¹d podczas wylogowania u¿ytkownika:', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas wylogowania u¿ytkownika.' });
    }
}


module.exports = { generateTokens, getUser, login, register, logout }