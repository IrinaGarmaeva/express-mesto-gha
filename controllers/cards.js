const Card = require('../models/card');

async function getCards(req, res) {
  return Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Карточка с указанным _id: ${cardId} не найдена.` });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function addLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: `Передан несуществующий _id: ${req.params.cardId} карточки.` });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function removeLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: `Передан несуществующий _id: ${req.params.cardId} карточки.` });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
