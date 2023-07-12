const User = require('../models/user');

function getUsers(req, res) {
  console.log('запрос пользователей');

  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка загрузки пользователей' }));
}

function getUser(req, res) {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка получения пользователя' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка добавления пользователя' }));
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка обновления данных пользователя' }));
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка обновления данных пользователя' }));
}

module.exports = { getUsers, getUser, createUser, updateUserInfo, updateAvatar };
