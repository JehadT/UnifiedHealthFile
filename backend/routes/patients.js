const express = require("express");
const router = express.Router();

const {
  getPatient, //patient id
  createPatient,
  getAllPatients,
} = require("../controllers/patients");

const {
  getAllRecords, //patient id
  getRecord, //record id
  createRecord, //patient id
  deleteRecord, //record id
  updateRecord, //record id
} = require("../controllers/records");

const {
  getAllMedicines,
  createMedicine,
  deleteMedicine,
} = require("../controllers/medicine");

router.route("/").post(createPatient).get(getAllPatients);
router.route("/:id").get(getPatient);
router.get("/records/:id", getAllRecords);
router
  .route("/record/:id")
  .get(getRecord)
  .post(createRecord)
  .delete(deleteRecord)
  .patch(updateRecord);

router.route("/medicine/:id").post(createMedicine).delete(deleteMedicine);
router.get("/medicines/:id", getAllMedicines);

module.exports = router;
