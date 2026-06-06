import { useState } from "react";
import api from "../services/api";
import "./Upload.css";

function Upload() {
  const [file, setFile] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(
        selectedFile
      )
    );

    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage(
        "Please select a file"
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "document",
        file
      );

      const res = await api.post(
        "/documents/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setMessage(
        res.data.message ||
          "Upload Successful"
      );

      setFile(null);
      setPreview(null);

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);

      setMessage(
        error.response?.data
          ?.message ||
          "Upload Failed"
      );
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">
        Upload Production Sheet
      </h1>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="file-input"
      />

      {preview && (
        <div className="preview-container">
          <img
            src={preview}
            alt="Preview"
            className="preview-image"
          />
        </div>
      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading
          ? "Processing OCR & AI..."
          : "Upload Document"}
      </button>

      {message && (
        <p className="message">
          {message}
        </p>
      )}
    </div>
  );
}

export default Upload;