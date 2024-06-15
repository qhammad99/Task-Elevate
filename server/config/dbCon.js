const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const db_url = 'mongodb://task-elevate-db:27017/testElevate';

        // await mongoose.connect(process.env.DATABASE_URI);
        await mongoose.connect(db_url);
    } catch(err){
        console.log(`[connectDB]: error => ${err}`);
    }
}

module.exports = connectDB;