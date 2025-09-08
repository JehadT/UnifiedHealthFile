const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    required: [true, "Please provide patient ID"],
    maxlength: 10,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide phone number"],
    maxlength: 10,
  },
  gender: {
    type: String,
    required: [true, "Please provide gender"],
    maxlength: 10,
  },
  bloodType: {
    type: String,
    required: [true, "Please provide blood type"],
    maxlength: 3,
  },
  height: {
    type: Number,
    required: [true, "Please provide height"],
    maxlength: 3,
  },
  weight: {
    type: Number,
    required: [true, "Please provide weight"],
    maxlength: 3,
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
    maxlength: 50,
  },
  insurance: {
    type: String,
    default: "None",
    maxlength: 100,
  },
});


module.exports = mongoose.model("Patient", PatientSchema);
