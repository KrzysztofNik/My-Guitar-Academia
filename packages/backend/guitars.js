const express = require('express');
const Guitar = require('./models/Guitars')
const { getUser } = require('./auth')

const addGuitar = async (req, res) => {

    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U�ytkownik niezalogowany' });
    }
    try {
        let { id, guitarImage, guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning } = req.body;
        let ownerId = user.id;
        await Guitar.query().insert({ id, guitarImage, guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning, ownerId })
        return res.status(200).json({ message: 'Pomy�lne dodanie gitary' });
        
    } catch (error) {
        console.error('B��d przy dodawaniu gitary do bazy danych', error)
        return res.status(500).json({error:'Wyst�pi� b��d podczas dodawania gitary'})
    }

}

const showGuitars = async (req, res) => {
    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U�ytkownik niezalogowany' });
    }

    try {
        const guitars = await Guitar.query().where('ownerId',user.id);
        return res.json(guitars);

    } catch (error) {
        console.error('B��d przy wyci�ganiu gitar', error)
        return res.status(500).json({ error: 'Wyst�pi� b��d podczas wyci�gania gitar z bazy danych' })
    }

}


module.exports = { addGuitar, showGuitars }