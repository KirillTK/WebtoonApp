import passport from 'passport';
import { User } from './models';

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export {
  passport,
};
