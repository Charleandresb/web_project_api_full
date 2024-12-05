import express from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";
import { celebrate, Joi } from "celebrate";

const router = express.Router();

router.get("/", getCards);

router.post(
  "/",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(20),
        link: Joi.string().required().uri(),
      })
      .unknown(true),
  }),
  createCard
);

router.delete("/:id", deleteCardById);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

export default router;
