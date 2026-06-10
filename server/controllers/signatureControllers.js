const Signature = require("../models/Signature");

exports.createSignature = async (req, res) => {
    try {
        const { document, page, x, y } = req.body;

        const signature = await Signature.create({document,
            signer: req.user.id, page, x, y
        });

        res.status(201).json(
            signature
        );

    } catch(error) {

        res.status(500).json({
            message:
            error.message
        });

    }
};

exports.getSignatures = async (req,res) => {
    try {
        const signatures = await Signature.find({
            document: req.params.documentId
        });
        res.json(signatures);

    } catch(error) {
        res.status(500).json({
            message:
            error.message
        });
    }
};