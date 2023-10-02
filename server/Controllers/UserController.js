import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get a user

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
      const token = jwt.sign(
        {username: user.username, id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
      )
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json("Bug Here");
    }
  } else {
    res.status(403).json({ message: "You can update only your account!" });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId == id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({ message: "User has been deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You can delete only your account!" });
  }
};

// follow a user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId == id) {
    res.status(403).json({ message: "You can't follow yourself!" });
  } else {
    try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(currentUserId); 

        if(!followUser.followers.includes(currentUserId)){
            await followUser.updateOne({ $push: { followers: currentUserId } });
            await followingUser.updateOne({ $push: { following: id } });
            res.status(200).json({ message: "User has been followed successfully" });
        }
        else{
            res.status(403).json({ message: "You already follow this user!" });
        }

    } catch (error) {
      res.status(500).json(error);
    }
  }
};


// unfollow a user

export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId == id) {
      res.status(403).json({ message: "You can't unfollow yourself!" });
    } else {
      try {
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(currentUserId); 
  
          if(followUser.followers.includes(currentUserId)){
              await followUser.updateOne({ $pull: { followers: currentUserId } });
              await followingUser.updateOne({ $pull: { following: id } });
              res.status(200).json({ message: "User has been unfollowed successfully" });
          }
          else{
              res.status(403).json({ message: "You do not follow this user!" });
          }
  
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };