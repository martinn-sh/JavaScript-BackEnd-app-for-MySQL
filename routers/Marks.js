const validateID = require('../middleware/validateID')
const { Mark, validate } = require('../models/Mark')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const mark = await Mark.findAll()
    res.send(mark)
})

router.get('/:id', validateID, async (req, res) => {
    const mark = await Mark.findByPk(req.params.id)

    if (!mark) return res.status(404).send('The mark with the given ID was not found.')

    res.send(mark)
})

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    await Mark.create({
        name: req.body.name,
        abbrv: req.body.abbrv,
        manufacturer: req.body.manufacturer
    }).then(mark => { res.send(mark) })
})

router.put('/:id', validateID, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    await Mark.findByPk(req.params.id).then(mark => {
        if (!mark) return res.status(404).send('The mark with the given ID was not found.')

        mark.update({
            name: req.body.name,
            abbrv: req.body.abbrv,
            manufacturer: req.body.manufacturer
        })
        mark.save()
        res.send(mark)
    })
})

router.delete('/:id', validateID, async (req, res) => {
    const mark = await Mark.findByPk(req.params.id)
    if (!mark) return res.status(404).send('The mark with the given ID was not found.')

    mark.destroy()
    res.send(mark)
})

module.exports = router