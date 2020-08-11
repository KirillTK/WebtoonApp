import { Router } from 'express';
import { passport } from '../passport';
import { registerUser, createSession } from '../middlewares';

const route = Router();

const login = (req, res, next) => {
  passport.authenticate('local',
    (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send();
      }

      res.user = user;
      return next();
    })(req, res, next);
};

route.post('/login', login, createSession);
route.post('/register', registerUser, passport.authenticate('local'), createSession);

export {
  route as loginRoutes,
};
