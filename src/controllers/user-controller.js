const userModel = require("../models/user-model");

const UNIQUE_CONSTRAINT_ERROR_MESSAGE = {
  email: "Email already exists.",
  phone: "Phone number already exists.",
  username: "Username is already taken.",
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id, userType } = req.params;
    const user = await userModel.getUser(id, userType);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const { userType } = req.query;
    const newUser = await userModel.createUser(user, userType);
    res.json(newUser);
  } catch (error) {
    const isUniqueViolationError = error.message.includes("unique constraint");
    const key = error.message.includes("email")
      ? "email"
      : error.message.includes("username")
      ? "username"
      : "phone";
    isUniqueViolationError
      ? res.status(400).json({
          error: {
            [key]: UNIQUE_CONSTRAINT_ERROR_MESSAGE[key],
          },
        })
      : res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const { userType } = req.query;
    const updatedUser = await userModel.updateUser(user, userType);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userType } = req.query;
    await userModel.deleteUser(id, userType);
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await userModel.getAdmins();
    if (!admins) {
      res.status(404).json({ message: "No admins found" });
    }
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertifiers = async (req, res) => {
  try {
    const certifiers = await userModel.getCertifiers();
    if (!certifiers) {
      res.status(404).json({ message: "No certifiers found" });
    }
    res.json({ certifiers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userType } = req.query;
    const user = await userModel.authenticateUser(email, password, userType);
    !user
      ? res.status(404).json({ message: "Invalid username or password" })
      : res.json({
          user: { user_type: userType, ...user },
          authenticated: true,
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAdmins,
  getCertifiers,
  authenticateUser,
};
