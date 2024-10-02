require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors_options = require('./config/corsOptions');
const connectDB = require('./config/dbCon');

const app = express();
const PORT = process.env.PORT || 9001;

// connection call with monogo db
connectDB();

// request middleware calls
app.use(logger);
// app.use(cors(cors_options));
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:9003',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

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

// first establish connection with mongo then start listen..
mongoose.connection.once('open', () => {
    console.log('Mongo DB connected..');  
    // start server to listen
    app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
})

// mongoose connection error handling
mongoose.connection.on('error', err => {
    console.log(`[Mongo Connection Error]: ${err}`);
    logEvents(`${new Date()}: mongo connection error`, 'mongo_error.log');
})