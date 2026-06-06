const Document = require("../models/Document");

exports.getDashboard = async (req, res) => {
  try {
    const totalUploads =
      await Document.countDocuments();

    const validationFailures =
      await Document.countDocuments({
        status: "review_required",
      });

    const completed =
      await Document.countDocuments({
        status: "completed",
      });

    const documents =
      await Document.find();

    const totalQuantity =
      documents.reduce(
        (sum, doc) =>
          sum +
          (doc.extractedData
            ?.quantityProduced || 0),
        0
      );

    res.json({
      success: true,
      totalUploads,
      validationFailures,
      completed,
      totalQuantity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};