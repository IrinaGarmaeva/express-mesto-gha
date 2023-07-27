const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');

const loginRoute = require('./login');
const signUpRoute = require('./createUser');
const signOutRoute = require('./signout');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFoundError = require('../errors/notFoundError');

router.use('/', loginRoute);
router.use('/', signUpRoute);

router.use(checkAuth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/signout', signOutRoute);

router.use('/*', (req, res, next) => next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`)));

module.exports = router;
