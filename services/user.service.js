import User from "../models/user/user.js";

export const createUser = async (
    name,
    email
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(
      "User already exists!",
      "UserExists"
    );
  }
  const user = new User({
    name,
    email
  });
  await user.save();
  return user;
};

export const getUsers = async () => {
    try {
      const usersList = await User.find({});
      return usersList;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser = async (email) => {
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};
