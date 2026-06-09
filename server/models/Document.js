const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number
    },

    status: {
        type: String,
        default: "Draft"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Document", documentSchema);