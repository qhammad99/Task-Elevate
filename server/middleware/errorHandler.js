// we will use that middleware in place of express error handler.

const { logEvents } = require('./logger');

const errorHandler = (error, req, res, next) => {
    let log_message = `${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(log_message, 'error_log.log');
    console.log(`[errorHandler]: ${error.stack}`);
    next();
}

module.exports = errorHandler;