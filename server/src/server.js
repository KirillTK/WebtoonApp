import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as cron from 'node-cron';
import { passport } from './passport';
import { updateComicsList } from './services/update-comics-list';
import { UPDATE_COMICS_TIME_PATTERN } from './constants';

import { loginRoutes, webtoonRoutes } from './controllers';

dotenv.config();

const { MONGODB_URI, NODE_ENV } = process.env;
const API_PREFIX = '/api';
const PORT = process.env.PORT || 8080;
const loggerMode = NODE_ENV === 'production' ? 'common' : 'dev';

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

app.use(logger(loggerMode));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(`${API_PREFIX}/`, loginRoutes);
app.use(`${API_PREFIX}/comics`, webtoonRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT} port`));

cron.schedule(UPDATE_COMICS_TIME_PATTERN, updateComicsList);
