const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')
require('./startup/syncDB')

const port = process.env.PORT || 7000
app.listen(port, () => console.log(`App available on http://localhost:${port}`))