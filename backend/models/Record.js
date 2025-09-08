const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
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
    doctorName: {
      type: String,
      required: [true, "Please provide doctor name"],
      maxlength: 50,
    },
    clinicName: {
      type: String,
      required: [true, "Please provide clinic name"],
      maxlength: 50,
    },
    pulseRate: {
      type: String,
      maxlength: 5,
    },
    bloodPressure: {
      type: String,
      maxlength: 7,
    },
    bodyTemp: {
      type: String,
      maxlength: 5,
    },
    chiefComplaint: {
      type: String,
      required: [true, "Please provide chief complaint"],
      maxlength: 500,
    },
    notes: {
      type: String,
      maxlength: 200,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);
