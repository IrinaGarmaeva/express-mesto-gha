const { checkToken } = require('../utils/utils');
const {
  ERROR_UNAUTHORIZED,
} = require('../errors/errors');

function checkAuth(req, res, next) {
  if (!req.cookies) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
}

module.exports = { checkAuth };
