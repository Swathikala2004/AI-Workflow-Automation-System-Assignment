require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
  require("./config/db");

const documentRoutes =
  require("./routes/documentRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "AI Workflow Automation API Running",
  });
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});