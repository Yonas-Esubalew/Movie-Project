import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";

import generateToken from "../utils/createToken.js";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(401).json({
        message: "Please fill All Required Fields",
        success: true,
        error: false,
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) res.status(400).send("User Already exists");

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    generateToken(res, newUser._id);
    return res.json({
      message: "User Register successfully!",
      error: false,
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        message: "Please fill All Required Fields",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const isPasswordValid = await bcryptjs.compare(
        password,
        existingUser.password
      );
      if (isPasswordValid) {
        generateToken(res, existingUser._id);
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } else {
      res.status(401).json({ message: "User Not found" });
    }
    return res.json({
      message: "Login  successfully!",
      error: false,
      success: true,
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutUser(req, res) {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.json({
      message: "LogOut successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const Users = await User.find({});
    return res.json({
      message: "User Retrieved Successfully!",
      error: false,
      success: true,
      data: Users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCurrentUserController(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.json({
        message: "Online user Retrieved Successfully! ",
        error: false,
        success: true,
        data: user,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateCurrentUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if(req.body.password){
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)
        user.password = hashedPassword
      }
      const updatedUser = await user.save()
      return res.json({
        message: "Profile Updated Successfully!",
        error: false,
        success: true,
        data: updatedUser
      });
    }else{
        res.status(404)
        throw new Error("User not found")
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
