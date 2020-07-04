const uuid = require('uuid')

const { getLogger } = require('src/common/logger')
const InMemoryGamesRepo = require('src/repositories/inMemoryGamesRepo')

logger = getLogger('games:TicTacToe')
const games = {}

class TicTacToeGame {
    constructor(gameId, firstPlayer, secondPlayer) {
        this.gameId = gameId
        this.status = 'RUNNING'
        this.firstPlayer = firstPlayer
        this.secondPlayer = secondPlayer

        this.board = [[null, null, null],
            [null, null, null],
            [null, null, null]]
    }

    move(isFirstPlayer, x, y) {
        if (this.status !== 'RUNNING') {
            throw new Error(`Game : ${this.gameId} is not RUNNING.`)
        }
        if (x < 0 || x > 2 || y < 0 || y > 2) {
            throw new Error(`Bad indicies ${x}, ${y}`)
        }
        const player = isFirstPlayer ? this.firstPlayer : this.secondPlayer

        if (this.board[x][y] !== null) {
            throw new Error(`Bad indicies ${x}, ${y}, already moved here.`)
        }

        this.board[x][y] = player

        const winner = this.checkWinner(player)
        if (winner) {
            this.status = 'ENDED'
        }
        return { winner, board: this.board }
    }

    checkWinner(player) {
        const horizontal0 = this.board[0][0] === player && this.board[1][0] === player && this.board[2][0] === player
        const horizontal1 = this.board[0][1] === player && this.board[1][1] === player && this.board[2][1] === player
        const horizontal2 = this.board[0][2] === player && this.board[1][2] === player && this.board[2][2] === player

        const vertical0 = this.board[0][0] === player && this.board[0][1] === player && this.board[0][2] === player
        const vertical1 = this.board[1][0] === player && this.board[1][1] === player && this.board[1][2] === player
        const vertical2 = this.board[2][0] === player && this.board[2][1] === player && this.board[2][2] === player

        const diagonalOne = this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player
        const diagonalTwo = this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player

        const winner = (vertical0 || vertical1 || vertical2 || horizontal0 || horizontal1 || horizontal2 || diagonalOne || diagonalTwo) ? player : null

        logger.info(`Winner is : ${winner}`)

        return winner
        
    }
}

const repo = new InMemoryGamesRepo('TicTacToe')

class TicTacToeGamesManager {

    constructor() {
        this.logger = getLogger('gamesManager:TicTacToe')
        this.repo = repo
    }

    create(parameters) {
        this.logger.info(`Creating new game. Parameters: ${JSON.stringify(parameters)}`)
        const { firstPlayer, secondPlayer } = parameters
        if (!firstPlayer || !secondPlayer) { return { result: null, error: { code: 400, message: 'Expecting firstPlayer:str, secondPlayer:str in body' } } }
        const gameId = uuid.v1()
        const newGame = new TicTacToeGame(gameId, firstPlayer, secondPlayer)

        this.repo.save(gameId, newGame)

        return { result: { code: 200, body: { gameId } }, error: null }
    }

    update(parameters) {
        this.logger.info(`Updating game. Parameters: ${JSON.stringify(parameters)}`)
        const { isFirstPlayer, x, y, gameId } = parameters
        if (!(typeof isFirstPlayer === 'boolean')
              || !Number.isInteger(x)
              || !Number.isInteger(y)
              || !gameId)
        { 
            return { result: null, error: { code: 400, message: 'Expecting isFirstPlayer:bool, x:int, y:int, gameId:str in body' } } 
        }
        const theGame = this.repo.getGame(gameId)
        try {
            const { winner, board } = theGame.move(isFirstPlayer, x, y)
            this.repo.save(gameId, theGame)
            return { result: { code: 200, body: { gameId, winner, board } }, error: null }
        }
        catch (e) {
            return { result: null, error: { code: 400, message: e.message } }
        }
    }

    get(parameters) {
        this.logger.info(`Getting game. Parameters: ${JSON.stringify(parameters)}`)
        const { gameId } = parameters
        if (!gameId) { return { result: null, error: { code: 400, message: 'Expecting gameId:str in body' } } }
        const theGame = this.repo.getGame(gameId)
        if (!theGame) {
            return { result: null, error: { code: 404, message: `Game: ${gameId} not found.` } }
        }

        return {
            result: {
                code: 200,
                body: {
                    gameId,
                    isWinner: theGame.checkWinner(theGame.firstPlayer) || theGame.checkWinner(theGame.secondPlayer),
                    board: theGame.board
                }
            },
            error: null
        }
    }
}

module.exports = TicTacToeGamesManager
