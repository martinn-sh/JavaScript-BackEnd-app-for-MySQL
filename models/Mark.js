const Sequelize = require('sequelize')
const Joi = require('joi')
const { sequelize } = require('../startup/db')

const Mark = sequelize.define('mark', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 30],
                msg: "Name length is not in this range."
            },
            notEmpty: {
                args: true,
                msg: "Name is required."
            }
        }
    },
    abbrv: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [1, 10],
                msg: "Abbreviation length is not in this range."
            }
        }
    },
    manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 20],
                msg: "Manufacturer length is not in this range."
            },
            notEmpty: {
                args: true,
                msg: "Manufacturer is required."
            }
        }
    }
})

function validateMark(mark) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        abbrv: Joi.string().min(1).max(10).optional(),
        manufacturer: Joi.string().min(2).max(20).required()
    })
    return schema.validate(mark)
}

exports.Mark = Mark
exports.validate = validateMark