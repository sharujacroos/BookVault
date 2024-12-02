import User from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const exitingUser = await findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registred successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error registering user", details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "User logged in successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging in user", details: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params;
    const user = await findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params;
    const updates = req.body;

    const updateUser = await findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully!", updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!", deleteUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
