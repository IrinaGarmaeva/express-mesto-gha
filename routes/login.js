const router = require('express').Router();

const { login } = require('../controllers/login');

router.post('/signin', login);

module.exports = router;
