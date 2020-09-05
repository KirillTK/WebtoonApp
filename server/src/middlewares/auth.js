import { User } from '../models';

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.register(new User({
      username,
      password,
    }), req.body.password);

    res.user = user;
    next();
  } catch (e) {
    res.status(422).json(e);
  }
};

export const createSession = (req, res) => {
  const { user } = res;
  req.logIn(user, () => res.status(200).json({ user }));
};
