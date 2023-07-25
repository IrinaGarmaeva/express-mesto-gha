const { checkToken } = require('../utils/utils');
const UnauthorizedError = require('../errors/unauthorizedError');

function checkAuth(req, res, next) {
  if (!req.cookies) {
    // return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
    // return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
}

module.exports = { checkAuth };
