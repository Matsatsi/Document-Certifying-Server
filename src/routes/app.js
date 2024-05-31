const appController = require("../controllers/app-controller");
const express = require("express");
const router = express.Router();

router.get("/app/admin", appController.getAdminStats);
router.get("/app/certifyee/:id", appController.getUserStats);
router.get("/app/certifier/:id", appController.getCertifierStats);

module.exports = router;
