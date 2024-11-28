import express from "express";
import {
  getUsers,
  getUserById,
  getUserInfo,
  editProfile,
  editAvatar,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getUserInfo);
router.get("/:id", getUserById);
router.patch("/me", editProfile);
router.patch("/me/avatar", editAvatar);

export default router;
