const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { uploadDocument } = require("../controllers/documentControllers");

router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);

module.exports = router;