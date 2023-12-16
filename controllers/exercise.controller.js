import * as exerciseService from "../services/exercise.service.js";
import Exercise from "../models/exercise/exercise.js";

export const createExercise = async (req, res, next) => {
  try {
    const { title, type, exerciseType, imageURL, videoURL, steps, sets, reps } = req.body;
    const exercise = await exerciseService.createExercise(
        title, 
        type,
        exerciseType,
        imageURL, 
        videoURL, 
        steps, 
        sets, 
        reps
    );
    res.status(201).json({ exercise });
  } catch (err) {
    console.log(err);
    if (
      err.message ===
      "Exercise already exists!"
    ) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const getExercises = async (req, res, next) => {
    try {
      const exerciseList = await exerciseService.getExercises();
      if (exerciseList) {
        res.status(200).json({ exerciseList });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

export const deleteExercise = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        const deletedExercise = await exerciseService.deleteExercise(exerciseId);

        if (!deletedExercise) {
        return res.status(404).json({ message: 'Exercise not found' });
        }

        return res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        console.error('Error deleting exercise:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    };