import Card from "../models/cards.js";
import NotFoundError from "../errors/not-found-error.js";
import NotReqError from "../errors/not-req-error.js";

export async function getCards(req, res, next) {
  await Card.find({})
    .sort({ createdAt: -1 }) //Orden de tarjetas prepend
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado la lista de cartas");
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}

export async function createCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  try {
    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    });
    if (!newCard) {
      throw new NotReqError("Datos ingresados incorrectos");
    }
    res.status(201).send({ newCard: newCard });
  } catch (error) {
    next(error);
  }
}

export async function deleteCardById(req, res, next) {
  await Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna carta con esa id");
    })
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch(next);
}

export async function likeCard(req, res, next) {
  const { userId } = req.user;

  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna carta con esa id");
    })
    .then((likedCard) => {
      res.send(likedCard);
    })
    .catch(next);
}

export async function dislikeCard(req, res, next) {
  const { userId } = req.user;

  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna carta con esa id");
    })
    .then((dislikedCard) => {
      res.send(dislikedCard);
    })
    .catch(next);
}
