import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Registering a new User
export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    firstname,
    lastname,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a User
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
                res.status(200).json(user);
            }
            else{
                res.status(400).json({ message: "Incorrect Password" });
            }
        }
        else{
            res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};
