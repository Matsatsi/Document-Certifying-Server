const express = require("express");
const docController = require("../controllers/doc-controller");
const docModel = require("../models/doc-model");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const clientId = req.body.client_id;
    cb(null, clientId + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const middleware = upload.fields([
  { name: "copy", maxCount: 1 },
  { name: "original", maxCount: 1 },
]);

router.post("/doc/upload", middleware, async (req, res) => {
  const copyFileName = req.files["copy"][0].filename;
  const originalFileName = req.files["original"][0].filename;
  try {
    const { client_id, document_type } = req.body;
    const newDoc = await docModel.saveDoc({
      client_id,
      document_type,
      copy_file_name: copyFileName,
      original_file_name: originalFileName,
    });
    res.json(newDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/docs", docController.getDocsByClient);
router.put("/doc/certify", docController.certifyDoc);
router.put("/doc/reject", docController.rejectDoc);
router.put("/doc/assign", docController.assignCertifier);
router.get("/jobs", docController.getAllDocs);
router.get("jobs/:id", docController.getDocsByClient);
router.delete("/doc/:id", docController.deleteDoc);
router.put("/docs/:id", docController.updateDoc);

module.exports = router;
