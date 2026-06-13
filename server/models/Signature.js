const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
{
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },

    signer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    page: {
        type: Number,
        required: true
    },

    x: {
        type: Number,
        required: true
    },

    y: {
        type: Number,
        required: true
    },

    signatureText: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Signature", signatureSchema);