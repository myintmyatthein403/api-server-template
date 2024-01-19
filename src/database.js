const mongoose = require('mongoose');
const { DBConfig } = require('./config/database-config');

const connectToDatabase = () => {
    mongoose.connect(`${DBConfig.DBHost}/${DBConfig.DBCollection}`, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', (error) => {
        throw new Error(`Unable to connect to the database.`);
    });

    db.once('open', () => {
        console.info('Connected to database.');
    })
}

module.exports = connectToDatabase;