import mongoose from "mongoose";
import validator from "validator";

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  lastName: {
    type: String,
    required: [true, "Please provide lastname"],
    maxlength: 20,
    unique: true,
    default: "lastname",
  },
  location: {
    type: String,
    required: [true, "Please provide lastname"],
    maxlength: 20,
    unique: true,
    default: "mycity",
  },
});

export default mongoose.model("Users", UsersSchema);
