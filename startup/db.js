const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql_db2', 'root', 'pug306GTI-6', {
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