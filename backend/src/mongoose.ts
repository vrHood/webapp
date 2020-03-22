import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application) {

    const uri = app.get('mongodb');
    const options = {
        useCreateIndex: true,
        useNewUrlParser: true
    };

    const connectWithRetry = function () {
        logger.info('MongoDB connection with retry');
        return mongoose.connect(uri, options);
    };

    mongoose.connection.on('error', err => {
        logger.info(`MongoDB connection error: ${err}`);
        setTimeout(connectWithRetry, 5000);
        // process.exit(-1)
    });

    mongoose.connection.on('connected', () => {
        logger.info('MongoDB is connected');
        app.emit('dbready');
    });

    mongoose.connect(
        uri,
        options
    );

    mongoose.Promise = global.Promise;

    app.set('mongooseClient', mongoose);
}
