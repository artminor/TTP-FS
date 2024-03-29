const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        //returns a promise
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('mongoDB connected...');
    } catch (err) {
        console.error(err.message);
        //exit process if fail
        process.exit(1);
    }
}

module.exports = connectDB;