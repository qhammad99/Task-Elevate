// we will use that middleware in place of express error handler.

const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'err_log.log');
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500 // server error 
    res.status(status);
    res.json({ message: err.message });
}

module.exports = errorHandler;