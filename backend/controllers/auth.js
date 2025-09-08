const User = require("../models/User");
const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// User

const register = async (req, res) => {
  await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).send("Pending Confirmation");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (user.isValid == false) {
    throw new UnauthenticatedError("Pending Confirmation");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, id: user._id }, token });
};

// Admin


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const adminToken = admin.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ admin: { name: admin.name, id: admin._id }, adminToken });
};

module.exports = {
  register,
  login,
  loginAdmin,
};
