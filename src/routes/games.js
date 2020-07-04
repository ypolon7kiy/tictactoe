const express = require('express')
const games = require('src/games/index')

const router = express.Router()

const { getLogger } = require('src/common/logger')

const logger = getLogger('routes:games')

function getGame(game, req, res) {
    logger.info(`Trying to use game: ${game}`)

    if (!games.isGameSupported(game)) {
        logger.info(`Game: ${game} is not supported.`)
        return res.status(404).send()
    }

    const params = req

    return games[game](params)
}

function handleResult(result, error, res) {
    if (error) {
        return res.status(error.code).send(error.message)
    }
    return res.status(result.code).send(result)
}

router.get('/:game', async (req, res) => {
    const theGame = getGame(req.params.game, req, res)
    const { result, error } = theGame.get(req.query)
    handleResult(result, error, res)
})

router.post('/:game', async (req, res) => {
    const theGame = getGame(req.params.game, req, res)
    const { result, error } = theGame.create(req.body)
    handleResult(result, error, res)
})

router.put('/:game', async (req, res) => {
    const theGame = getGame(req.params.game, req, res)
    const { result, error } = theGame.update(req.body)
    handleResult(result, error, res)
})

router.delete('/:game', async (req, res) => {
    const theGame = getGame(req.params.game, req, res)
    const { result, error } = theGame.delete(req.body)
    handleResult(result, error, res)
})

module.exports = router
