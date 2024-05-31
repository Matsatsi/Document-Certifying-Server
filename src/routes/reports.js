const express = require("express");
const reportController = require("../controllers/report-controller");

const router = express.Router();

// Reports Routes urls
router.get("/report/users", reportController.usersReport);
router.get("/report/full", reportController.fullReport);

module.exports = router;
