## TESTS
`npm run test`

## START SERVER
`npm start`

## CURL CREATE GAME
`curl --location --request POST 'http://0.0.0.0:8080/games/tictactoe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstPlayer": "a",
    "secondPlayer": "b"
}'`


## CURL PUT MOVE 1
`curl --location --request PUT 'http://0.0.0.0:8080/games/tictactoe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isFirstPlayer": true,
    "x": 0,
    "y": 0,
    "gameId": "ed7de230-be2c-11ea-85cf-457120a8b50d"
}
'`
## CURL PUT MOVE 2
`curl --location --request PUT 'http://0.0.0.0:8080/games/tictactoe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isFirstPlayer": true,
    "x": 1,
    "y": 1,
    "gameId": "ed7de230-be2c-11ea-85cf-457120a8b50d"
}
'`
## CURL PUT MOVE 3
`curl --location --request PUT 'http://0.0.0.0:8080/games/tictactoe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isFirstPlayer": true,
    "x": 2,
    "y": 2,
    "gameId": "ed7de230-be2c-11ea-85cf-457120a8b50d"
}
'`

## CURL GET GAME -> change gameId
`curl --location --request GET 'http://0.0.0.0:8080/games/tictactoe?gameId=???????????????' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstPlayer": "a",
    "secondPlayer": "b"
}'`