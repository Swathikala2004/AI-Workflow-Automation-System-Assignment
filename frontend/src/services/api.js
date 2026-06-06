import axios from "axios";

const api = axios.create({
  baseURL:
    "https://ai-workflow-automation-system-assignment.onrender.com/api",
});

export default api;