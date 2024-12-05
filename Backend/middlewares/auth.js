import jwt from "jsonwebtoken";
import "dotenv/config";
import NotAuthError from "../errors/not-auth-error.js";

const secretKey = process.env.SECRET_KEY;

export default (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new NotAuthError("sesión inválida");
    }

    const token = authorization.replace("Bearer ", "");

    let payload; //variable let para manejarla fuera del bloque try

    payload = jwt.verify(token, secretKey);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
