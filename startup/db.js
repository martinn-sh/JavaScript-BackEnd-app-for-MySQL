const Sequelize = require('sequelize')

const sequelize = new Sequelize('Add your database', 'Add user', 'Add your password', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected successfully to MySQL..')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

exports.sequelize = sequelize