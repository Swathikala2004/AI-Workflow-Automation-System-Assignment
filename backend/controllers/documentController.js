const Document = require("../models/Document");

const {
  extractText,
} = require("../services/ocrService");

const {
  extractStructuredData,
} = require("../services/geminiService");

// Upload & Process Document
exports.uploadDocument = async (
  req,
  res
) => {
  try {
    const filePath = req.file.path;

    // OCR
    const ocrText =
      await extractText(filePath);

    console.log(
      "========== OCR TEXT =========="
    );
    console.log(ocrText);

    // AI Extraction
    const extractedData =
      await extractStructuredData(
        ocrText
      );

    console.log(
      "========== AI RAW RESPONSE =========="
    );
    console.log(extractedData);

    // Remove markdown if AI returns it
    const cleanedData =
      extractedData
        .replace(
          /```json\s*/gi,
          ""
        )
        .replace(
          /```\s*/gi,
          ""
        )
        .trim();

    console.log(
      "========== CLEANED RESPONSE =========="
    );
    console.log(cleanedData);

    let data;

    try {
      data =
        JSON.parse(cleanedData);
    } catch (err) {
      console.log(
        "========== INVALID JSON =========="
      );
      console.log(cleanedData);

      throw new Error(
        "AI returned invalid JSON"
      );
    }

    const validationErrors =
      [];

    // Validation Rules

    if (!data.date) {
      validationErrors.push(
        "Date Missing"
      );
    }

    if (!data.shift) {
      validationErrors.push(
        "Shift Missing"
      );
    }

    if (
      data.shift &&
      ![
        "I",
        "II",
        "III",
      ].includes(data.shift)
    ) {
      validationErrors.push(
        "Invalid Shift"
      );
    }

    if (!data.machineNumber) {
      validationErrors.push(
        "Machine Number Missing"
      );
    }

    if (
      data.machineNumber &&
      !/^MC-\d+$/i.test(
        data.machineNumber
      ) &&
      !/^ABC-/i.test(
        data.machineNumber
      )
    ) {
      validationErrors.push(
        "Invalid Machine Number"
      );
    }

    if (
      !data.quantityProduced &&
      data.quantityProduced !==
        0
    ) {
      validationErrors.push(
        "Quantity Missing"
      );
    }

    const document =
      await Document.create({
        fileName:
          req.file.originalname,

        filePath,

        extractedData: data,

        validationErrors,

        status:
          validationErrors.length >
          0
            ? "review_required"
            : "completed",
      });

    res.status(201).json({
      success: true,
      message:
        "Document processed successfully",
      document,
    });
  } catch (error) {
    console.error(
      "========== ERROR =========="
    );
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// Get All Documents + Search
exports.getDocuments =
  async (req, res) => {
    try {
      const search =
        req.query.search ||
        "";

      const docs =
        await Document.find({
          fileName: {
            $regex: search,
            $options: "i",
          },
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        count: docs.length,
        data: docs,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Single Document
exports.getDocumentById =
  async (req, res) => {
    try {
      const document =
        await Document.findById(
          req.params.id
        );

      if (!document) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Document not found",
          });
      }

      res.json({
        success: true,
        document,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Review & Update Document
exports.updateDocument =
  async (req, res) => {
    try {
      const document =
        await Document.findByIdAndUpdate(
          req.params.id,
          {
            extractedData:
              req.body,
            status:
              "completed",
            validationErrors:
              [],
          },
          {
            new: true,
          }
        );

      if (!document) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Document not found",
          });
      }

      res.json({
        success: true,
        message:
          "Document updated successfully",
        document,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Delete Document
exports.deleteDocument =
  async (req, res) => {
    try {
      const document =
        await Document.findByIdAndDelete(
          req.params.id
        );

      if (!document) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Document not found",
          });
      }

      res.json({
        success: true,
        message:
          "Document deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };