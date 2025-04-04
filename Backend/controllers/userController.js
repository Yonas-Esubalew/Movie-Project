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
    
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({  // Added return
        message: "Please fill all required fields",
        error: true
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({  // Added return
        message: "User not found",
        error: true
      });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({  // Added return
        message: "Invalid password",
        error: true
      });
    }

    // Generate token and send success response
    const token = generateToken(res, existingUser._id);
    
    return res.status(200).json({  // Added return
      message: "Login successful!",
      error: false,
      success: true,
      data: {
        _id: existingUser._id,
        email: existingUser.email,
        // Include other user fields as needed
        token: token  // Assuming generateToken returns the token
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
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
