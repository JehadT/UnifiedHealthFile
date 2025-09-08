const Record = require("../models/Record");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllRecords = async (req, res) => {
  const {
    params: { id: patientId },
  } = req;
  const records = await Record.find({ patientId: patientId }).select("hospitalName clinicName createdAt").sort("createdAt");
  if (!records) {
    throw new NotFoundError(`No patient with id ${patientId}`);
  }
  res.status(StatusCodes.OK).json({ records, count: records.length });
};

const getRecord = async (req, res) => {
  const {
    params: { id: recordId },
  } = req;
  const record = await Record.findOne({ _id: recordId });
  if (!record) {
    throw new NotFoundError(`No record with id ${recordId}`);
  }
  res.status(StatusCodes.OK).json({ record });
};

const createRecord = async (req, res) => {
  req.body.patientId = req.params.id;
  req.body.hospitalName = req.user.name
  req.body.createdBy = req.user.userId;
  const record = await Record.create(req.body);
  res.status(StatusCodes.CREATED).json(record);
};

const updateRecord = async (req, res) => {
  const {
    user: { userId },
    params: { id: recordId },
  } = req;
  const record = await Record.findOneAndUpdate(
    { _id: recordId, createdBy: userId },
    { _id: recordId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!record) {
    throw new NotFoundError(
      `You don't have access to this record!`
    );
  }
  res.status(StatusCodes.OK).json({ record });
};

const deleteRecord = async (req, res) => {
  const {
    user: { userId },
    params: { id: recordId },
  } = req;

  const record = await Record.findOneAndDelete({
    _id: recordId,
    createdBy: userId,
  });
  if (!record) {
    throw new NotFoundError(
      `You don't have access to this record!`
    );
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
