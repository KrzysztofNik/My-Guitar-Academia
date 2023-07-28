const express = require('express');
const router = express.Router();
const { addGuitar, showGuitars, editGuitar } = require('./guitars')
const Guitar = require('./models/Guitars')

router.post('/add', addGuitar)
router.get('/show', showGuitars)
router.put('/:ownerId/:guitarId/edit', editGuitar)
router.get('/image/:id', async (req, res) => {
    try {
        const guitarId = req.params.id;
        const guitar = await Guitar.query().findById(guitarId);

        if (!guitar || !guitar.guitarImage) {
            return res.status(404).json({ error: 'Obraz nie zosta³ znaleziony' });
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(guitar.guitarImage);
    } catch (error) {
        console.error('B³¹d podczas pobierania obrazu', error);
        return res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas pobierania obrazu' });
    }
});

module.exports = router