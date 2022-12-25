import express from 'express';
import router from '../routes/index.route';
import bodyParser from 'body-parser';
import cors from 'cors'

let app = express();



app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use('/v1/', router);

export default app;