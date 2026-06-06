const express = require("express");
const multer = require("multer");

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

// Upload Document
router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

// Get All Documents
router.get(
  "/",
  getDocuments
);

// Get Single Document
router.get(
  "/:id",
  getDocumentById
);

// Update Document (Review Workflow)
router.put(
  "/:id",
  updateDocument
);

// Delete Document
router.delete(
  "/:id",
  deleteDocument
);

module.exports = router;