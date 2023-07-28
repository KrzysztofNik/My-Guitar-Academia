const express = require('express');
const Guitar = require('./models/Guitars')
const { getUser } = require('./auth')
const multer = require('multer')

const parseValue = (value) => {
    if (value === "" || value === 'null') {
        return null;
    }
    return value;
};

const addGuitar = async (req, res) => {

    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U¿ytkownik niezalogowany' });
    }
    try {
        const { guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning } = req.body;
        const guitarImage = req.file ? req.file.buffer : null;
        const ownerId = user.id;
        await Guitar.query().insert({
            guitarImage: guitarImage,
            guitarName: parseValue(guitarName),
            guitarModel: parseValue(guitarModel),
            bought: parseValue(bought),
            year: parseValue(year),
            price: parseValue(price),
            stringChange: parseValue(stringChange),
            stringsProducer: parseValue(stringsProducer),
            stringThickness: parseValue(stringThickness),
            lastCleaning: parseValue(lastCleaning),
            ownerId: ownerId
        });        return res.status(200).json({ message: 'Pomyœlne dodanie gitary' });
        
    } catch (error) {
        console.error('B³¹d przy dodawaniu gitary do bazy danych', error)
        return res.status(500).json({error:'Wyst¹pi³ b³¹d podczas dodawania gitary'})
    }

}


const showGuitars = async (req, res) => {
    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U¿ytkownik niezalogowany' });
    }

    try {
        const guitars = await Guitar.query().where('ownerId', user.id);
        return res.json(guitars);

    } catch (error) {
        console.error('B³¹d przy wyci¹ganiu gitar', error)
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas wyci¹gania gitar z bazy danych' })
    }

}

const editGuitar = async (req, res) => {
    const { user } = await getUser(req, res, () => { });

    if (!user) {
        return res.status(401).json({ error: 'U¿ytkownik niezalogowany' });
    }

    try {
        const { guitarName, guitarModel, bought, year, price, stringChange, stringsProducer, stringThickness, lastCleaning } = req.body;
        const guitarImage = req.file ? req.file.buffer : null;
        const guitarId = req.params.guitarId;
        let updatedFields = {};
        if (guitarImage === null) {
             updatedFields = {
                guitarName: parseValue(guitarName),
                guitarModel: parseValue(guitarModel),
                bought: parseValue(bought),
                year: parseValue(year),
                price: parseValue(price),
                stringChange: parseValue(stringChange),
                stringsProducer: parseValue(stringsProducer),
                stringThickness: parseValue(stringThickness),
                lastCleaning: parseValue(lastCleaning)
            };
        }
        else {
            updatedFields = {
                guitarImage: guitarImage,
                guitarName: parseValue(guitarName),
                guitarModel: parseValue(guitarModel),
                bought: parseValue(bought),
                year: parseValue(year),
                price: parseValue(price),
                stringChange: parseValue(stringChange),
                stringsProducer: parseValue(stringsProducer),
                stringThickness: parseValue(stringThickness),
                lastCleaning: parseValue(lastCleaning)
            };
        }
        await Guitar.query().findById(guitarId).patch(updatedFields);

        return res.status(200).json({ message: 'Pomyœlne edytowano gitarê' });

    } catch (error) {
        console.error('B³¹d przy edytowaniu gitary w bazie danych', error)
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas edytowania gitary' })
    }
}


module.exports = { addGuitar, showGuitars, editGuitar }