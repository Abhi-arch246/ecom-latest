const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

//endPoint : '/api/users/login'
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user._id);
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        return res.send("Invalid credentials");
      }
    } else {
      return res.send("Email not registered");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Invalid email or password");
  }
};

//endPoint : '/api/users'
const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send("User with this email already exisits");
    } else {
      try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          isAdmin,
        });
        if (user) {
          generateToken(res, user._id);
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        } else {
          return res.status(400).send("Something went wrong");
        }
      } catch (error) {
        return res.status(400).send("Something went wrong");
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

//endPoint : '/api/users/logout'
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      htttpOnly: true,
      expiresIn: new Date(0),
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

//endPoint : '/api/users/profile'
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

//endPoint : '/api/users/update'
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
    return res.send("User profile updated");
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

//endPoint : '/api/users/allusers'
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).sort({ createdAt: -1 });
  res.send(allUsers);
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
