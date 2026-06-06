import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";
import "./Review.css";

function Review() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      date: "",
      shift: "",
      employeeNumber: "",
      operationCode: "",
      machineNumber: "",
      workOrderNumber: "",
      quantityProduced: "",
      timeTaken: "",
    });

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument =
    async () => {
      try {
        const res =
          await api.get(
            `/documents/${id}`
          );

        setFormData(
          res.data.document
            .extractedData
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave =
    async () => {
      try {
        await api.put(
          `/documents/${id}`,
          formData
        );

        setMessage(
          "Document Updated Successfully"
        );

        setTimeout(() => {
          navigate(
            "/history"
          );
        }, 1000);
      } catch (error) {
        console.log(error);

        setMessage(
          "Update Failed"
        );
      }
    };

  return (
    <div className="review-container">
      <h1 className="review-title">
        Review Extracted Data
      </h1>

      <div className="review-form">
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={
            formData.date || ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="shift"
          placeholder="Shift"
          value={
            formData.shift || ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="employeeNumber"
          placeholder="Employee Number"
          value={
            formData.employeeNumber ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="operationCode"
          placeholder="Operation Code"
          value={
            formData.operationCode ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="machineNumber"
          placeholder="Machine Number"
          value={
            formData.machineNumber ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="workOrderNumber"
          placeholder="Work Order Number"
          value={
            formData.workOrderNumber ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="number"
          name="quantityProduced"
          placeholder="Quantity Produced"
          value={
            formData.quantityProduced ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <input
          type="number"
          name="timeTaken"
          placeholder="Time Taken"
          value={
            formData.timeTaken ||
            ""
          }
          onChange={
            handleChange
          }
        />

        <button
          className="save-btn"
          onClick={
            handleSave
          }
        >
          Save Changes
        </button>

        {message && (
          <p className="message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Review;