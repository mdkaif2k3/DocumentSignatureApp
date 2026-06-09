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

exports.getDocuments = async (req, res) => {
    try {

        const documents = await Document.find({
            owner: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(documents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getDocumentById = async (req, res) => {
    try {

        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        res.status(200).json(document);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};