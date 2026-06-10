const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createSignature, getSignatures } = require("../controllers/signatureControllers");

router.post("/", authMiddleware, createSignature);
router.get("/:documentId", authMiddleware, getSignatures);

module.exports = router;