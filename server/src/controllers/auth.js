import { Router } from 'express';
import { passport } from '../passport';
import { User } from '../models';

const route = Router();

const login = (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect(`/login?info=${info}`);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });
    })(req, res, next);
};

const register = (req, res, next) => {
  console.log(req.body);
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.send('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.send('/secret');
    });
  });
};

route.post('/login', login);
route.post('/register', register);

export {
  route as loginRoutes,
};
