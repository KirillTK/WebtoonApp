import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models';
import { generateHash, validPassword } from './services/passport';

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done({ message: 'Incorrect details' }, false);
    if (!validPassword(password, user.password)) {
      return done({ message: 'Incorrect password or email' }, false);
    }
    return done(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (user) {
      return done({ message: 'This email is already using' }, false);
    } else {
      const user = new User({ email, password: generateHash(password) });
      user.save().then((user) => done(null, user));
    }
  });
}));

export {
  passport,
};
