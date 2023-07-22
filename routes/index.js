const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const loginRoute = require('./login');


router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/', loginRoute);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;
