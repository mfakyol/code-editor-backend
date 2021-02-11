import mongoose, { mongo } from "mongoose";
import {nanoid} from "nanoid";

const { Schema } = mongoose;

const codeSchema = new Schema({
  userId: {
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _id: {
    type: String,
    default: () => nanoid(6)
  },
  title: {
    type: String,
    default: "Web Project",
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  template: {
    type: String,
    default: "",
  },
  templateMode: {
    type: String,
    default: "",
  },
  templatePreprocessor: {
    type: String,
    default: "",
  },
  style: {
    type: String,
    default: "",
  },
  styleMode: {
    type: String,
    default: "",
  },
  stylePreprocessor: {
    type: String,
    default: "",
  },
  script: {
    type: String,
    default: "",
  },
  scriptMode: {
    type: String,
    default: "",
  },
  scriptPreprocessor: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  createdDate: {
    type: Date,
    default:Date.now
  },
  lastModifiedDate: {
    type: Date,
    default:Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Code", codeSchema);
