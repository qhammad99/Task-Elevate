const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async(message, log_file_name) => {
    const date_time = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    const log_record = `${date_time}: \t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs')))
            await fsp.mkdir(path.join(__dirname, '..', 'logs'));
        
        await fsp.appendFile(path.join(__dirname, '..', 'logs', log_file_name), log_record);
    } catch (error){
        console.log(`[logEvents-error]:  ${error}`);
    }
}


const logger = (req, res, next) => {
    let log_message = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(log_message, 'req_log.log');
    console.log(`[Request-logger]: ${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };