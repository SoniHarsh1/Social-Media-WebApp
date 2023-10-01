import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Registering a new User
export const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {

    const oldUser = await UserModel.findOne({ username});
    if (oldUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const user = await newUser.save();
    const token = jwt.sign({
      username: user.username,
      id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1h'} );
    res.status(200).json({user, token});
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
            if(!validPassword){
              res.status(400).json({ message: "Incorrect Password" });
            }
            else{
              const token = jwt.sign({
                username: user.username,
                id: user._id
              }, process.env.JWT_SECRET, { expiresIn: '1h'} );
              res.status(200).json({user, token});
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
