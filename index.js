const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const app = express()

const { getLogger } = require('src/common/logger')

const logger = getLogger('main:app')

const gamesRoutes = require('src/routes/games')


const port = config.get('node.port')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/games', gamesRoutes)

app.listen(port, () => logger.info(`Starting app. Port: ${port}`))