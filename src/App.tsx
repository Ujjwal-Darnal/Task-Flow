import ProjectsPage from "./pages/ProjectsPage";
import DashboardPage from "./pages/DashboardPage";
import { Route, Routes, Link } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}

export default App;