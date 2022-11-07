import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

const loggerDev = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.Console({level: 'warning'}),
        new winston.transports.Console({level: 'error'})
    ]
});

const loggerProd = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.File({filename: 'warning.log' , level: 'warning'}),
        new winston.transports.File({filename: 'error.log' , level: 'error'}),
    ]
});

const logger = NODE_ENV === 'development'
    ?  loggerDev
    :  loggerProd ;

export default logger;