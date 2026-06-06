import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./History.css";

function History() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, [search]);

  const fetchDocuments = async () => {
    try {
      const res = await api.get(
        `/documents?search=${search}`
      );

      setDocs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this document?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/documents/${id}`
      );

      fetchDocuments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="history-container">
      <h1 className="history-title">
        Document History
      </h1>

      <div className="history-summary">
        <h3>
          Total Documents: {docs.length}
        </h3>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search documents..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Date Uploaded</th>
              <th>Validation Errors</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.fileName}</td>

                <td>
                  <span
                    className={
                      doc.status ===
                      "review_required"
                        ? "status-review"
                        : "status-completed"
                    }
                  >
                    {doc.status}
                  </span>
                </td>

                <td>
                  {
                    doc.extractedData
                      ?.quantityProduced
                  }
                </td>

                <td>
                  {new Date(
                    doc.createdAt
                  ).toLocaleString()}
                </td>

                <td>
                  {doc.validationErrors
                    ?.length > 0
                    ? doc.validationErrors.join(
                        ", "
                      )
                    : "No Errors"}
                </td>

                <td>
                  {doc.status ===
                  "review_required" ? (
                    <button
                      className="review-btn"
                      onClick={() =>
                        navigate(
                          `/review/${doc._id}`
                        )
                      }
                    >
                      Review
                    </button>
                  ) : (
                    <span className="done-text">
                      ✓ Done
                    </span>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        doc._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {docs.length === 0 && (
          <p className="no-data">
            No documents found.
          </p>
        )}
      </div>
    </div>
  );
}

export default History;