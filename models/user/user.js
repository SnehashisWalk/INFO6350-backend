import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
  },
  level: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: String
  },
  height: {
    type: String
  },
  bmi: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;