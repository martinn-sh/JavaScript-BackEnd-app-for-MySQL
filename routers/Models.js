const validateID = require('../middleware/validateID')
const { Model, validate } = require('../models/Model')
const { Mark } = require('../models/Mark')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const model = await Model.findAll({ include: [{ model: Mark, required: true }] })
    res.send(model)
})

router.get('/:id', validateID, async (req, res) => {
    const model = await Model.findByPk(req.params.id, {
        include: [{ model: Mark, required: true }]
    })

    if (!model) return res.status(404).send('The model with the given ID was not found.')

    res.send(model)
})

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = await Mark.findByPk(req.body.markId)
    if (!mark) return res.status(400).send('Invalid mark')

    await Model.create({
        name: req.body.name,
        markId: req.body.markId
    }).then(model => { res.send({ model, mark }) })
})

router.put('/:id', validateID, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const mark = await Mark.findByPk(req.body.markId)
    if (!mark) return res.status(400).send('Invalid mark')

    await Model.findByPk(req.params.id).then(model => {
        if (!model) return res.status(404).send('The model with the given ID was not found.')

        model.update({
            name: req.body.name,
            markId: req.body.markId
        })
        model.save()
        res.send({ model, mark })
    })
})

router.delete('/:id', validateID, async (req, res) => {
    const model = await Model.findByPk(req.params.id)
    if (!model) return res.status(404).send('The model with the given ID was not found.')

    model.destroy()
    res.send(model)
})

module.exports = router