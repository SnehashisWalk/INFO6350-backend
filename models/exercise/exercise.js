import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;