import bcrypt from 'bcrypt';

export const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(9));

export const validPassword = (userPassword, password) => bcrypt.compareSync(userPassword, password);
