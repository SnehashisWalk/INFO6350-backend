import * as userService from "../services/user.service.js";
import User from "../models/user/user.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await userService.createUser(
        name,
        email
    );
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    if (
      err.message ===
      "User already exists!"
    ) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res, next) => {
    try {
      const usersList = await userService.getUsers();
      if (usersList) {
        res.status(200).json({ usersList });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

export const deleteUser = async (req, res) => {
    const email = req.params.email;

    try {
        const deletedUser = await userService.deleteUser(email);

        if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    };