import Exercise from "../models/exercise/exercise.js";

export const createExercise = async (
    title, 
    type,
    exerciseType,
    imageURL, 
    videoURL, 
    steps, 
    sets, 
    reps
) => {
  const existingExercise = await Exercise.findOne({ title });
  if (existingExercise) {
    throw new Error(
      "Exercise already exists!",
      "ExerciseExists"
    );
  }
  const exercise = new Exercise({
    title, 
    type,
    exerciseType,
    imageURL, 
    videoURL, 
    steps, 
    sets, 
    reps
  });
  await exercise.save();
  return exercise;
};

export const getExercises = async () => {
    try {
      const exerciseList = await Exercise.find({});
      return exerciseList;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteExercise = async (exerciseId) => {
    try {
      const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
      return deletedExercise;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      throw new Error('Failed to delete exercise');
    }
  };