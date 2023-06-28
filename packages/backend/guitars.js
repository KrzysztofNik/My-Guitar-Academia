const express = require('express');
const Guitar = require('./models/Guitars')
const { getUser } = require('./auth')

const addGuitar = async (req, res) => {

    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U¿ytkownik niezalogowany' });
    }
    console.log(3);
    try {
        let { id, guitarImage, guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning } = req.body;
        let ownerId = user.id;
        await Guitar.query().insert({ id, guitarImage, guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning, ownerId })
        return res.status(200).json({ message: 'Pomyœlne dodanie gitary' });
        
    } catch (error) {
        console.error('B³¹d przy dodawaniu gitary do bazy danych', error)
        return res.status(500).json({error:'Wyst¹pi³ b³¹d podczas dodawania gitary'})
    }

}

module.exports = { addGuitar }