
const TicTacToeManager = require('src/games/ticTacToeManager')

const games = {
  'tictactoe': (params) => new TicTacToeManager(params),
  isGameSupported: (game) => games[game] !== undefined,
  getGame: (game) => games[game](game)
}


module.exports = games