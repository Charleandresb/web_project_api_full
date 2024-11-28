import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Charles",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Skateboarder",
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
    default: "http://1-example.com",
  },
});

const User = mongoose.model("user", userSchema);
export default User;
