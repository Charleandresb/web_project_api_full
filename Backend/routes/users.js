import express from "express";
import {
  getUsers,
  getUserById,
  getUserInfo,
  editProfile,
  editAvatar,
} from "../controllers/users.js";
import { celebrate, Joi } from "celebrate";

const router = express.Router();

router.get("/", getUsers);

router.get(
  "/me",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUserInfo
);

router.get(
  "/:id",
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().alphanum().length(24),
      })
      .unknown(true),
  }),
  getUserById
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(20),
        about: Joi.string().required().min(2).max(40),
      })
      .unknown(true),
  }),
  editProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().required().uri(),
      })
      .unknown(true),
  }),
  editAvatar
);

export default router;
