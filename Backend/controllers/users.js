import User from "../models/users.js";
import generateToken from "../helper/generateToken.js";

export async function getUsers(req, res) {
  await User.find({})
    .orFail(() => {
      const error = new Error("No se ha encontrado la lista de usuarios");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode).send({ message: error.message });
    });
}

export async function getUserById(req, res) {
  await User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode).send({ message: error.message });
    });
}

export async function getUserInfo(req, res) {
  const { userId } = req.user;
  console.log(userId);
  const user = await User.findById(userId);
  res.send(user);
}

export async function createUser(req, res) {
  const { email, password } = req.body;

  await User.create({
    email,
    password,
  })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send({ message: "No se ha creado el usuario por datos inválidos" });
    });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user === null) {
      return res.status(404).send("usuario no encontrado");
    }
    const token = generateToken(user);
    res.send({ token });
  } catch (error) {
    res.status(500).send("Algo salió mal");
  }
}

export async function editProfile(req, res) {
  const { name, about } = req.body;
  const { userId } = req.user;

  await User.findByIdAndUpdate(userId, {
    name,
    about,
  })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((newUserProfile) => {
      res.send(newUserProfile);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode).send({ message: error.message });
    });
}

export async function editAvatar(req, res) {
  const { avatar } = req.body;
  const { userId } = req.user;

  await User.findByIdAndUpdate(userId, {
    avatar,
  })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((newUserAvatar) => {
      res.send(newUserAvatar);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode).send({ message: error.message });
    });
}
