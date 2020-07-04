const config = require('config')
const uuid = require('uuid')

const { transports, createLogger, format } = require('winston')

const contextId = uuid.v1()
const { combine, label, simple } = format

const theFormat = combine(label({ label: contextId }), simple())

function getLogger(context) {

    const consoleTransport = new transports.Console({ format: theFormat })

    consoleTransport.level = config.get('logger.level')

    const loggerOptions = {
        format: theFormat,
        defaultMeta: { service: context },
        transports: [consoleTransport]
    }

    const logger = createLogger(loggerOptions)

    return logger
}

module.exports = { getLogger }
