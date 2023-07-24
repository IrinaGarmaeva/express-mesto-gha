const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');

const loginRoute = require('./login');
const signUpRoute = require('./createUser');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/', loginRoute);
router.use('/', signUpRoute);

router.use('/users', checkAuth, userRoutes);
router.use('/cards', checkAuth, cardRoutes);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;
