import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { resolve } from 'path';
import https from 'https';
import * as cron from 'node-cron';
import fs from 'fs';
import { passport } from './passport';
import { updateComicsList } from './services/update-comics-list';
import { UPDATE_COMICS_TIME_PATTERN } from './constants';

import { loginRoutes, webtoonRoutes } from './controllers';

dotenv.config();

const key = fs.readFileSync(resolve(__dirname, '../localhost.key'));
const cert = fs.readFileSync(resolve(__dirname, '../localhost.crt'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtoon';
const PORT = process.env.PORT || 8080;

const app = express();

const session = expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});

(async () => {
  try {
    await mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use('/comics', webtoonRoutes);

const server = https.createServer({ key, cert }, app);

server.listen(PORT, () => console.log(`Listening on ${PORT} port`));

cron.schedule(UPDATE_COMICS_TIME_PATTERN, updateComicsList);
