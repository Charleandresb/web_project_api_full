import express from "express";
import { createUser, loginUser } from "./controllers/users.js";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import { notFoundRoute } from "./routes/utils.js";
import auth from "./middlewares/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"; // dependencia para mongoose.connect(variable de entorno)

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect(process.env.DIREC_AROUND_MONGODB_ATLAS)
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("algo salió mal", err);
  });

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "670d4c649f6be94c5d23179a", // Hardcoding id
//   };

//   next();
// });

app.post("/users/signup", createUser);
app.post("/users/signin", loginUser);

app.use(auth);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.use("*", notFoundRoute); // * Ruta aleatoria

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
