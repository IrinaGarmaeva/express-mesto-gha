const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');

const loginRoute = require('./login');
const signUpRoute = require('./createUser');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFoundError = require('../errors/notFoundError');

router.use('/', loginRoute);
router.use('/', signUpRoute);

router.use('/users', checkAuth, userRoutes);
router.use('/cards', checkAuth, cardRoutes);

router.use('/*', checkAuth, (req, res) => {
  throw new NotFoundError(`Ресурс по адресу ${req.path} не найден`);
});

module.exports = router;
