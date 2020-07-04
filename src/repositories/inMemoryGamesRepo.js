const { getLogger } = require('src/common/logger')


class InMemoryGamesRepo {

  constructor(gameName) {
    this.logger = getLogger(`gamesRepositories:inMemory:${gameName}`)
    this.gameName = gameName
    this.games = {}
  }

  save(gameId, game) {
    this.logger.info(`Saving gameId: ${gameId}, game: ${JSON.stringify(game)}`)

    this.games[gameId] = game
  }

  getGame(gameId) {
    this.logger.info(`Getting gameId: ${gameId}.`)

    return this.games[gameId]
  }

}

module.exports = InMemoryGamesRepo