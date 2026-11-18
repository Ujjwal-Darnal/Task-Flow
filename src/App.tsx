import ProjectsPage from "./pages/ProjectsPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import { Route, Routes, Link } from "react-router-dom";
import "./css/App.css";
import {useState,useEffect} from "react";
import { projects } from "./data/projects";
import type { Project } from "./types/project";
import {tasks} from "./data/tasks";
import type {Task} from "./types/task";

function App() {

 const [projectList, setProjectList] = useState<Project[]>(() => {
  try {
    const savedProjects = localStorage.getItem("taskflow-projects");

    if (savedProjects !== null) {
      return JSON.parse(savedProjects) as Project[];
    }
  } catch (error) {
    console.error("Could not load saved projects:", error);
  }

  return projects;
});

useEffect(() => {
  try {
    localStorage.setItem(
      "taskflow-projects",
      JSON.stringify(projectList)
    );
  } catch (error) {
    console.error("Could not save projects:", error);
  }
}, [projectList]);


const[taskList,setTaskList] = useState<Task[]>(()=>{
  try{
    const savedTasks = localStorage.getItem("taskflow-tasks");
    
    if(savedTasks!== null){
      return JSON.parse(savedTasks) as Task[];
    }
  }catch(error){
    console.error("Could not load saved tasks:",error);
  }
  return tasks;
});
useEffect(()=>{
  try{
    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(taskList)
    );
  }catch(error){
    console.error("Could not save tasks:",error);
  }
},[taskList]);
  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>

      </nav>

      <Routes>
        <Route
         path="/" 
         element={<DashboardPage
          projectList = {projectList}
          taskList = {taskList} />}
         
         />
        <Route 
        path="/projects" 
        element={<ProjectsPage 
        projectList={projectList}
      setProjectList={setProjectList}
      taskList = {taskList}/>} />


        <Route 
        path="/tasks"
         element={<TasksPage projectList = {projectList}
         taskList = {taskList}
         setTaskList = {setTaskList} />} />
        
      </Routes>
    </>
  );
}

export default App;