const allowed_origins = require('./allowedOrigins');

const cors_options = {
    origin: (origin, cb) => {
        // !origin is for postman,
        if(allowed_origins.indexOf(origin) != -1 || !origin)
            cb(null, true); //first is error(null),, second allow or not (true)
        else
            cb(new Error('Not Allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = cors_options;