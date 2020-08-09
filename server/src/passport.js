import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models';
import { generateHash, validPassword } from './services/passport';

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, username, password, done) => {

  console.log(req.body);
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.send('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  });
}));

export {
  passport,
};
