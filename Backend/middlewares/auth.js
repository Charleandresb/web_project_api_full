import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "sesión inválida" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload; //variable let para manejarla fuera del bloque try
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).send({ message: "sesión inválida" });
  }

  req.user = payload;

  next();
};
