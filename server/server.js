require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors_options = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 9001;

// request middleware calls
app.use(logger);
// app.use(cors(cors_options));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));

// 404 route,, must be at end
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html'))
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if(req.accepts('json'))
        res.json({message: '404: Page not found'});
    else
        res.type('txt').send('404: Page not found');
})

// response middleware calls
app.use(errorHandler);

// start server to listen
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));