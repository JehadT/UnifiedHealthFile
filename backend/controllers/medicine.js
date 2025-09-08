const Medicine = require("../models/Medicine");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllMedicines = async (req, res) => {
  const {
    params: { id: patientId },
  } = req;
  const medicines = await Medicine.find({ patientId: patientId })
    .select("hospitalName medicineName dosage duration createdAt")
    .sort("createdAt");
  if (!medicines) {
    throw new NotFoundError(`No patient with id ${patientId}`);
  }
  res.status(StatusCodes.OK).json({ medicines, count: medicines.length });
};

const createMedicine = async (req, res) => {
  req.body.patientId = req.params.id;
  req.body.hospitalName = req.user.name;
  req.body.createdBy = req.user.userId;
  const medicine = await Medicine.create(req.body);
  res.status(StatusCodes.CREATED).json(medicine);
};

const deleteMedicine = async (req, res) => {
  const {
    user: { userId },
    params: { id: medicineId },
  } = req;

  const medicine = await Medicine.findOneAndDelete({
    _id: medicineId,
    createdBy: userId,
  });
  if (!medicine) {
    throw new NotFoundError(`You don't have access to this medicine!`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllMedicines,
  createMedicine,
  deleteMedicine,
};
