import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  const barData = [
    {
      name: "Uploads",
      value: data.totalUploads,
    },
    {
      name: "Completed",
      value: data.completed,
    },
    {
      name: "Review",
      value: data.validationFailures,
    },
  ];

  const pieData = [
    {
      name: "Completed",
      value: data.completed,
    },
    {
      name: "Review Required",
      value: data.validationFailures,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        🚀 AI Workflow Dashboard
      </h1>

      <div className="cards">
        <div className="card uploads-card">
          <h3>Total Uploads</h3>
          <p>{data.totalUploads}</p>
        </div>

        <div className="card validation-card">
          <h3>Validation Failures</h3>
          <p>{data.validationFailures}</p>
        </div>

        <div className="card completed-card">
          <h3>Completed Records</h3>
          <p>{data.completed}</p>
        </div>

        <div className="card quantity-card">
          <h3>Total Quantity</h3>
          <p>{data.totalQuantity}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Workflow Summary</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={barData}>
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Status Distribution</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;