import winston from 'winston';
import dotenv from 'dotenv'

dotenv.config()

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

let logger;

const buildProdLogger = () => {
    const logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({ level: "info" }),
            new winston.transports.File({ filename: './errors.log', level: 'error' })
        ]
    })
    return logger
}

const buildDevLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: "debug" }),
            new winston.transports.File({ filename: './errors.log', level: 'error' })
        ]
    })
    return logger
}

if(process.env.ENV === 'production'){
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next()
}