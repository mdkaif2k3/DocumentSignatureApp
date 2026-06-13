const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { generateSignedPDF } = require("../controllers/pdfControllers");

router.post("/generate/:documentId", authMiddleware, generateSignedPDF);

module.exports = router;