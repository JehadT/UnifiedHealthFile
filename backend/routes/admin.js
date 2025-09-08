const express = require("express");
const router = express.Router();

const { getAllUsers, verifyUser, rejectUser } = require("../controllers/admin");

router.get("/", getAllUsers);
router.route("/:id").patch(verifyUser).delete(rejectUser)

module.exports = router;
