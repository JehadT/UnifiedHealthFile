const Patient = require("../models/Patient");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getPatient = async (req, res) => {
  const patientId = req.params.id
  const patient = await Patient.findOne({ patientId: patientId });
  if (!patient) {
    throw new NotFoundError(`No patient with id ${patientId}`);
  }
  res.status(StatusCodes.OK).json({ patient });
};


const createPatient = async (req, res) => {
  const {patientId} = req.body
  if (patientId.length == 10) {
    const patient = await Patient.create(req.body);
    res.status(StatusCodes.CREATED).json(patient);
  } else {
    throw new Error(`Patient ID is too long or too short`);
  }
};

const getAllPatients = async (req, res) => {
  const patients = await Patient.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ patients, count: patients.length });
};

module.exports = {
  getPatient,
  createPatient,
  getAllPatients
};
