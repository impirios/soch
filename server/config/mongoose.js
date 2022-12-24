import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = Promise;

let mongoUri = 'mongodb://';


mongoUri += `${config.mongoHost}:${config.mongoPort}/${config.dbName}`;
mongoose.connect(mongoUri);
mongoose.connection.on('error', (error) => {
    console.log(`unable to connect to database: ${mongoUri}`,error);
});
