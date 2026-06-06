import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Review from "./pages/Review";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/review/:id"
          element={<Review />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;