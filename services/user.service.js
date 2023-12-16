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
    email,
    goal: "Default Goal",
    level: "Default Level",
    gender: "Default Gender",
    age: 25, // Set your desired default age value
    weight: "Default Weight",
    height: "Default Height",
    bmi: "Default BMI",
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

  export const getUser = async (email) => {
    try {
      const user = await User.findOne({ email });
  
      // Format the user data to fit the expected response format
      const formattedUser = {
        goal: user.goal || '',
        level: user.level || '',
        gender: user.gender || '',
        age: user.age || 25,
        weight: user.weight || '',
        height: user.height || '',
        bmi: user.bmi || '',
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      };
  
      return formattedUser;
    } catch (error) {
      console.log(error);
      return null; // Return null in case of an error
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
