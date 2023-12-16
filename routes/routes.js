import express from "express";
import * as exerciseController from "../controllers/exercise.controller.js";
import * as userController from "../controllers/user.controller.js";
import Exercise from "../models/exercise/exercise.js";
import User from "../models/user/user.js";

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


// USER routes
router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.delete('/users/:email', userController.deleteUser);

router.put('/users/:email', async (req, res) => {
    const { email } = req.params; 
    const { name, goal, level, gender, age, weight, height, bmi } = req.body;  

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name,
            });
        }

        if (goal) user.goal = goal;
        if (level) user.level = level;
        if (gender) user.gender = gender;
        if (age) user.age = age;
        if (weight) user.weight = weight;
        if (height) user.height = height;
        if (bmi) user.bmi = bmi;

        await user.save(); 

        res.status(200).json({ message: 'User updated/created successfully', user });
    } catch (error) {
        console.error('Error updating/creating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

  

export default router;