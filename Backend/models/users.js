import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import NotAuthError from "../errors/not-auth-error.js";
import validator from "validator";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Debes ingresar un email",
    },
    //como sabe mi backend que el email realmente existe?
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /(http|https):\/\/(www\.)?[a-zA-Z0-9\W]{3,63}\.[a-z]{1,3}\/?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=])*/.test(
          v
        );
      },
      message: "Lo sentimos. Debes ingresar una url válida",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotAuthError("Email o contraseña incorrectos");
        //return Promise.reject(new Error("Email o contraseña incorrectos"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthError("Email o contraseña incorrectos");
          //return Promise.reject(new Error("Email o contraseña incorrectos"));
        }
        return user;
      });
    });
};

const User = mongoose.model("user", userSchema);
export default User;
