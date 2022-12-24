import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = Promise;

let mongoUri = 'mongodb://';


mongoUri += `${config.mongoHost}:${config.mongoPort}/${config.dbName}`;
if(config.env == 'production'){
    mongoUri = `mongodb+srv://impirios:groffers@cluster0.vwylo.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
}

mongoose.connect(mongoUri);
mongoose.connection.on('error', (error) => {
    console.log(`unable to connect to database: ${mongoUri}`,error);
});


