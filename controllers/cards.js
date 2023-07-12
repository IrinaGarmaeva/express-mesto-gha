const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then(cards => res.status(200).send({ cards }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка загрузки карточек' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка добавления карточки'}));
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка удаления карточки'}));
}

function addLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка добавления лайка' }));
}

function removeLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка удаления лайка' }));
}

module.exports = { getCards, createCard, deleteCard, addLike, removeLike }