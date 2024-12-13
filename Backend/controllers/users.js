import User from "../models/users.js";
import generateToken from "../helper/generateToken.js";
import NotFoundError from "../errors/not-found-error.js";
import NotReqError from "../errors/not-req-error.js";
import bcrypt from "bcryptjs";

export async function getUsers(req, res, next) {
  await User.find({})
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado la lista de usuarios");
    })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
}

export async function getUserById(req, res, next) {
  await User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con esa id");
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

export async function getUserInfo(req, res, next) {
  const { userId } = req.user;
  console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("No se ha encontrado ningún usuario con esa id");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hash,
    });
    if (!hash || !newUser) {
      throw new NotReqError("No se ha creado el usuario por datos inválidos");
    }
    res.status(201).send({ _id: newUser._id, email: newUser.email });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  return await User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user);
      res.send({ token });
    })
    .catch(next);
}

export async function editProfile(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  await User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    { returnDocument: "after" }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con esa id");
    })
    .then((newUserProfile) => {
      res.send(newUserProfile);
    })
    .catch(next);
}

export async function editAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  await User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    { returnDocument: "after" } //retorna el documento después
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con esa id");
    })
    .then((newAvatar) => {
      res.send(newAvatar);
    })
    .catch(next);
}
