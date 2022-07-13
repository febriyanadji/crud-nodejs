import express from 'express';

import mongoose from 'mongoose';

import route from './routes/index.js';

import cors from 'cors';

const app = express();

mongoose.connect(
  'mongodb://' +
    process.env.MONGODB_HOST +
    ':27017/' +
    process.env.MONGODB_DBNAME,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    },
    authSource: 'admin',
  }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));
app.use(cors());
app.use(express.json());
app.use('/product', route);
app.listen('3000', () => console.log('server running at port : 3000'));
