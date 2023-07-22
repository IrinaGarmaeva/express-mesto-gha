const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
} = require('../errors/errors');
const { generateToken } = require('../utils/utils');

const User = require('../models/user');

function login(req, res) {
  if (!req.body) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Получены невалидные данные' });
    return;
  }

  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt, token');
      res.send({ token });
    })
    .catch((err) => res.status(ERROR_UNAUTHORIZED).send({ message: err.message }));
}

module.exports = { login };
