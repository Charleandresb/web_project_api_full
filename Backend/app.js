import express from "express";
import { createUser, loginUser } from "./controllers/users.js";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import { notFoundRoute } from "./routes/utils.js";
import auth from "./middlewares/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"; // dependencia para mongoose.connect(variable de entorno)
import { celebrate, errors, Joi } from "celebrate";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  "https://web-project-api-full-woad.vercel.app",
  "http://localhost:4000",
  "200.83.23.180",
  "http://200.83.23.180",
  "https://aroundnatapi.vercel.app",
];

app.use(function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET, HEAD, PUT, PATCH, POST, DELETE";
  //const requestHeaders = req.headers["access-control-request-headers"];
  const REQUEST_HEADERS = "Content-Type, Authorization";

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", REQUEST_HEADERS);

    return res.end();
  }

  next();
});

mongoose
  .connect(process.env.DIREC_AROUND_MONGODB_ATLAS, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("algo salió mal", err);
  });

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.post(
  "/users/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      })
      .unknown(true),
  }),
  createUser
);
app.post(
  "/users/signin",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      })
      .unknown(true),
  }),
  loginUser
);

app.use(auth);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.use("*", notFoundRoute); // * Ruta aleatoria

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: message });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

//module.exports = app;

export default app;
