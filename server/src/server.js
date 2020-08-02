import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
    console.log('Mongoose up!');
  } catch (e) {
    console.log('Connection db failed');
  }
})();

app.use(bodyParser.json());

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT} port`));
