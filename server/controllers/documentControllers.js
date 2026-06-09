const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const document = await Document.create({
                owner: req.user.id,
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileSize: req.file.size
            });

        res.status(201).json({
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};