const Sequelize = require('sequelize')
const Joi = require('joi')
const { sequelize } = require('../startup/db')

const Model = sequelize.define('model', {
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
    markId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'marks',
            key: 'id'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "Mark ID is required."
            }
        }
    }
})

function validateModel(model) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        markId: Joi.string().uuid().required()
    })
    return schema.validate(model)
}

exports.Model = Model
exports.validate = validateModel