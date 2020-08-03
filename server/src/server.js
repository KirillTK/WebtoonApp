import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { resolve } from 'path';
import https from 'https';
import fs from 'fs';
import { passport } from './passport';

import { loginRoutes } from './controllers/auth';

dotenv.config();

console.log(resolve(`${__dirname}../keytmp.pem`));

const key = fs.readFileSync(resolve(__dirname, '../key.pem'));
const cert = fs.readFileSync(resolve(__dirname, '../cert.pem'));

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
    console.log('Mongoose up!');
  } catch (e) {
    console.log('Connection db failed');
  }
})();

// Controllers;
app.use(loginRoutes);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();

router.get('/hello', (req, res) => {
  console.log('here');
  res.send({ name: 'kriill' });
});

app.use(router);
//
// app.post('/login',
//   passport.authenticate('local-login', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   });

const server = https.createServer({ key, cert }, app);

server.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT} port`));
