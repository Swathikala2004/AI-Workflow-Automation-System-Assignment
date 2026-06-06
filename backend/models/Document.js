const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    fileName: String,
    filePath: String,
    extractedData: Object,
    validationErrors: [String],
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Document",
  documentSchema
);