const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const Document = require("../models/Document");
const Signature = require("../models/Signature");

exports.generateSignedPDF = async (req,res) => {

    try {
        const document = await Document.findById(
            req.params.documentId
        );

        if (!document) {
            return res.status(404).json({
                message:
                "Document not found"
            });

        }
        const signatures = await Signature.find({
            document:
            document._id
        });

        const pdfPath = path.join(__dirname, "..",document.filePath);
        const existingPdf = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdf);
        const pages = pdfDoc.getPages();

        for(const signature of signatures) {

            const page = pages[
                signature.page - 1
            ];
            const { width, height } = page.getSize();
            const x = (signature.x / 100) * width;
            const y = (signature.y / 100) * height;

            page.drawText(signature.signatureText || "SIGNED",
                {
                    x,
                    y,
                    size: 18
                }
            );
        }

        const pdfBytes = await pdfDoc.save();
        const outputPath = path.join(__dirname, "..", "signed", `signed-${Date.now()}.pdf`);

        fs.writeFileSync(
            outputPath,
            pdfBytes
        );

        res.json({
            message:
            "Signed PDF generated",
            file:
            outputPath
        });

    } catch(error) {
        res.status(500).json({
            message:
            error.message
        });
    }
};