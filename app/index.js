import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import rootRoute from './routes/index.js';
import cors from 'cors';
import { applyJWT, handleUnauthorized } from './middlewares/index.js';
import {
  MONGODB_DBNAME,
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USERNAME,
} from './config.js';

const app = express();

mongoose.connect(
  'mongodb://' + MONGODB_HOST + ':' + MONGODB_PORT + '/' + MONGODB_DBNAME,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      username: MONGODB_USERNAME,
      password: MONGODB_PASSWORD,
    },
    authSource: 'admin',
  }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(applyJWT);
app.use(handleUnauthorized);
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.listen('3000', () => console.log('server running at port : 3000'));
