import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { resolve } from 'path';
import https from 'https';
import fs from 'fs';
import { passport } from './passport';

import { loginRoutes } from './controllers/auth';

dotenv.config();

const key = fs.readFileSync(resolve(__dirname, '../localhost.key'));
const cert = fs.readFileSync(resolve(__dirname, '../localhost.crt'));

const app = express();

const session = expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});

(async () => {
  try {
    await mongoose
      .connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose up!');
  } catch (e) {
    console.log('Connection db failed');
  }
})();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(loginRoutes);

const server = https.createServer({ key, cert }, app);

server.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT} port`));
