const { checkToken } = require('../utils/utils');
const {
  ERROR_UNAUTHORIZED,
} = require('../errors/errors');

function checkAuth(req, res, next) {
  if (!req.cookies) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация111' });
  }

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  console.log(req.user);
  next();
}

module.exports = { checkAuth };
