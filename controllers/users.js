const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
}

function getUser(req, res) {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь по указанному _id: ${userId} не найден` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при запросе пользователя.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      if ((name.length < 2 || name.length > 30) || (about.length < 2 || about.length > 30)) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с указанным _id: ${req.user._id} не найден.` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getUsers, getUser, createUser, updateUserInfo, updateAvatar,
};
