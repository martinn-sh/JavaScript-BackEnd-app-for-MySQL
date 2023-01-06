const { sequelize } = require('./db')
const { Mark } = require('../models/Mark')
const { Model } = require('../models/Model')

Mark.hasMany(Model, { foreignKey: 'markId' })
Model.belongsTo(Mark)

sequelize.sync().catch(err => console.error(err.message))