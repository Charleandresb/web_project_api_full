import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(http|https):\/\/(www\.)?[a-zA-Z0-9\W]{3,63}\.[a-z]{1,3}\/?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=])*/.test(
          v
        );
      },
      message: "Lo sentimos. Debes ingresar una url válida",
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("card", cardSchema);
export default Card;

// \b(https?):\/\/(www\.)?[A-Za-z0-9.\-_~:/?%#[\]@!$&'()*+,;=]+\b (regex url images)
