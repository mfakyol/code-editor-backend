import mongoose from "mongoose";
import { v4 } from "uuid";
import emailValidator from "../helpers/validateEmail";

const { Schema } = mongoose;

const userSchema = new Schema({
  apiKey: {
    index: true,
    unique: true,
    type: String,
    default: v4,
  },
  email: {
    index: true,
    unique: true,
    type: String,
    validate: {
      validator: emailValidator,
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "Email required."],
  },
  fullName: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    default: "N",
  },
  activationCode: {
    type: String,
    default: Math.floor(100000 + Math.random() * 900000).toString(),
  },
});

export default mongoose.model("User", userSchema);
