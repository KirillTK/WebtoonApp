import { Router } from 'express';

const route = Router();

const login = (req, res) => {
  res.send({ name: 'kirill' });
};

const register = (req, res) => {
  res.send({ name: 'kirill' });
};

route.get('/login', login);
route.get('register', register);

export {
  route as loginRoutes,
};
