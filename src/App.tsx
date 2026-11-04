import ProjectsPage from "./pages/ProjectsPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import { Route, Routes, Link } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>

      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        
      </Routes>
    </>
  );
}

export default App;