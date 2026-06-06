import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        AI Workflow
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;