const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user');
const { generateToken } = require('../utils/utils');

const saltRounds = 10;

const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../errors/errors');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' }));
}

function getUser(req, res) {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_NOT_FOUND)
          .send({
            message: `Пользователь по указанному _id: ${userId} не найден`,
          });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при запросе пользователя.',
          });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
}

function createUser(req, res) {
  if (!req.body) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Получены невалидные данные' });
    return;
  }

  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Email или пароль не заполнены' });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Пользователь с таким Email уже существует' });
    return;
  }

  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
        return;
      }
      res.status(201).send(user);
    });
};

function login(req, res) {
  if (!req.body) {
    res
      .status(ERROR_BAD_REQUEST)
      .send({ message: 'Получены невалидные данные' });
    return;
  }

  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => res.status(ERROR_UNAUTHORIZED).send({ message: err.message }));
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_NOT_FOUND)
          .send({
            message: `Пользователь с указанным _id: ${req.user._id} не найден.`,
          });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError' || 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_NOT_FOUND)
          .send({
            message: `Пользователь с указанным _id: ${req.user._id} не найден.`,
          });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getUsers,
  getUser,
  updateUserInfo,
  updateAvatar,
  login,
  createUser,
};
