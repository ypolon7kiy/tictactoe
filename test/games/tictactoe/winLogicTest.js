const chai = require('chai')
const ticTacToeManager = require('src/games/ticTacToeManager')


it('test/games/tictactoe/winLogicTest 1', async () => {

    const user = Math.random() >= 0.5 ? "playerOne" : "playerTwo"
    const isFirstPlayer = user === "playerOne" ? true : false

    const actionResult1 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user,null,null],[null,null,null],[null,null,null]]}},"error":null}
    const actionResult2 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user,null,null],[user,null,null],[null,null,null]]}},"error":null}
    const actionResult3 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner": user,"board":[[user,null,null],[user,null,null],[user,null,null]]}},"error":null}

    var actionResults = [actionResult1, actionResult2, actionResult3]
    const manager = new ticTacToeManager()
    let result = manager.create({ firstPlayer: 'playerOne', secondPlayer: 'playerTwo' })
    const gameId = result.result.body.gameId
    actionResults.forEach(result => result.result.body.gameId = gameId)

    result = manager.update({ isFirstPlayer, x: 0, y: 0, gameId })
    await chai.expect(result).to.deep.equal(actionResult1)

    result = manager.update({ isFirstPlayer, x: 1, y: 0, gameId })
    await chai.expect(result).to.deep.equal(actionResult2)

    result = manager.update({ isFirstPlayer, x: 2, y: 0, gameId })
    await chai.expect(result).to.deep.equal(actionResult3)

}).timeout(60000)



it('test/games/tictactoe/winLogicTest 2', async () => {

    const user2 = Math.random() >= 0.5 ? "playerOne" : "playerTwo"
    const isFirstPlayer2 = user2 === "playerOne" ? true : false

    const action2Result1 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user2,null,null],[null,null,null],[null,null,null]]}},"error":null}
    const action2Result2 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user2,user2,null],[null,null,null],[null,null,null]]}},"error":null}
    const action2Result3 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner": user2,"board":[[user2,user2,user2],[null,null,null],[null,null,null]]}},"error":null}

    const actionResults2= [action2Result1, action2Result2, action2Result3]

    const manager = new ticTacToeManager()
    let result = manager.create({ firstPlayer: 'playerOne', secondPlayer: 'playerTwo' })
    const gameId = result.result.body.gameId
    actionResults2.forEach(result => result.result.body.gameId = gameId)

    result = manager.update({ isFirstPlayer: isFirstPlayer2, x: 0, y: 0, gameId })
    await chai.expect(result).to.deep.equal(action2Result1)

    result = manager.update({ isFirstPlayer: isFirstPlayer2, x: 0, y: 1, gameId })
    await chai.expect(result).to.deep.equal(action2Result2)

    result = manager.update({ isFirstPlayer: isFirstPlayer2, x: 0, y: 2, gameId })
    await chai.expect(result).to.deep.equal(action2Result3)

}).timeout(60000)



it('test/games/tictactoe/winLogicTest 3', async () => {

    const user3 = Math.random() >= 0.5 ? "playerOne" : "playerTwo"
    const isFirstPlayer3 = user3 === "playerOne" ? true : false


    const action3Result1 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user3,null,null],[null,null,null],[null,null,null]]}},"error":null}
    const action3Result2 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner":null,"board":[[user3,null,null],[null,user3,null],[null,null,null]]}},"error":null}
    const action3Result3 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-03b5bd0442fe","winner": user3,"board":[[user3,null,null],[null,user3,null],[null,null,user3]]}},"error":null}

    const actionResults3= [action3Result1, action3Result2, action3Result3]

    const manager = new ticTacToeManager()
    let result = manager.create({ firstPlayer: 'playerOne', secondPlayer: 'playerTwo' })
    const gameId = result.result.body.gameId
    actionResults3.forEach(result => result.result.body.gameId = gameId)

    result = manager.update({ isFirstPlayer: isFirstPlayer3, x: 0, y: 0, gameId })
    await chai.expect(result).to.deep.equal(action3Result1)

    result = manager.update({ isFirstPlayer: isFirstPlayer3, x: 1, y: 1, gameId })
    await chai.expect(result).to.deep.equal(action3Result2)

    result = manager.update({ isFirstPlayer: isFirstPlayer3, x: 2, y: 2, gameId })
    await chai.expect(result).to.deep.equal(action3Result3)

}).timeout(60000)

it('test/games/tictactoe/winLogicTest 4', async () => {

    const user4 = Math.random() >= 0.5 ? "playerOne" : "playerTwo"
    const isFirstPlayer4 = user4 === "playerOne" ? true : false


    const action4Result1 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-04b5bd0442fe","winner":null,"board":[[null,null,user4],[null,null,null],[null,null,null]]}},"error":null}
    const action4Result2 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-04b5bd0442fe","winner":null,"board":[[null,null,user4],[null,user4,null],[null,null,null]]}},"error":null}
    const action4Result3 = {"result":{"code":200,"body":{"gameId":"faf24b90-be22-11ea-9254-04b5bd0442fe","winner": user4,"board":[[null,null,user4],[null,user4,null],[user4,null,null]]}},"error":null}

    const actionResults4= [action4Result1, action4Result2, action4Result3]

    const manager = new ticTacToeManager()
    let result = manager.create({ firstPlayer: 'playerOne', secondPlayer: 'playerTwo' })
    const gameId = result.result.body.gameId
    actionResults4.forEach(result => result.result.body.gameId = gameId)

    result = manager.update({ isFirstPlayer: isFirstPlayer4, x: 0, y: 2, gameId })
    await chai.expect(result).to.deep.equal(action4Result1)

    result = manager.update({ isFirstPlayer: isFirstPlayer4, x: 1, y: 1, gameId })
    await chai.expect(result).to.deep.equal(action4Result2)

    result = manager.update({ isFirstPlayer: isFirstPlayer4, x: 2, y: 0, gameId })
    await chai.expect(result).to.deep.equal(action4Result3)

}).timeout(60000)