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
    default: ""
  },
  level: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  age: {
    type: Number,
    default: 25
  },
  weight: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  bmi: {
    type: String,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;