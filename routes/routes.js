import express from "express";
import * as exerciseController from "../controllers/exercise.controller.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
    res.status(200).send("healthcheck ok!");
  });

router.post("/exercises", exerciseController.createExercise);
router.get("/exercises", exerciseController.getExercises);
router.delete('/exercises/:id', exerciseController.deleteExercise);

export default router;