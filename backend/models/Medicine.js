const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    patientId: {
      type: Number,
      required: [true, "Please provide patient ID"],
      maxlength: 10,
    },
    hospitalName: {
      type: String,
      required: [true, "Please provide hospital name"],
      maxlength: 30,
    },
    medicineName: {
      type: String,
      required: [true, "Please provide medicine name"],
      maxlength: 50,
    },
    dosage: {
      type: String,
      required: [true, "Please provide dosage"],
      maxlength: 50,
    },
    duration: {
      type: String,
      required: [true, "Please provide duration"],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", MedicineSchema);
