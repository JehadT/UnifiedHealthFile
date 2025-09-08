const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");


const getAllUsers = async (req, res) => {
  const users = await User.find({isValid: false}).sort("createdAt");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const verifyUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotFoundError(
      `User does not exist`
    );
  }
  res.status(StatusCodes.OK).json({ user });
};

const rejectUser = async (req, res) => {
  const {
    params: {id: userId}
  } = req
  const user = await User.findOneAndDelete({
    _id: userId,
  });
  res.status(StatusCodes.OK).send();
}

module.exports = {
  getAllUsers,
  verifyUser,
  rejectUser
};
