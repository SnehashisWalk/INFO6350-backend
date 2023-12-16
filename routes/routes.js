import express from "express";
import * as exerciseController from "../controllers/exercise.controller.js";
import Exercise from "../models/exercise/exercise.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
    res.status(200).send("healthcheck ok!");
  });

router.post("/exercises", exerciseController.createExercise);
router.get("/exercises", exerciseController.getExercises);
router.delete('/exercises/:id', exerciseController.deleteExercise);

router.get("/exercises/filter", async (req, res) => {
    try {
      let filter = {};
      const { exerciseType, type } = req.query;

      console.log(exerciseType, type)
  
      if (exerciseType && type) {
        filter = { exerciseType, type };
      } else if (exerciseType) {
        filter = { exerciseType };
      } else if (type) {
        filter = { type };
      }
  
      const exerciseList = await Exercise.find(filter);
  
      if (exerciseList.length > 0) {
        res.status(200).json({ exerciseList });
      } else {
        res.status(404).json({ message: 'No exercises found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export default router;