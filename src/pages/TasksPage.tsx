import { tasks } from "../data/tasks";
import TaskCard from "../components/TaskCard"
import { useState } from "react";
import { projects } from "../data/projects";
import "../css/TasksPage.css"

function TasksPage(){

const [selectedProjectId,setSelectedProjectId] = useState<number | "all">("all");

const filteredTasks = tasks.filter((task) => selectedProjectId=== "all" ? true:task.projectId === selectedProjectId);

return(
<main className="tasks-page">
    <h1>Tasks</h1>
    <div className="tasks-filter">
      <label htmlFor="selectedProjectId">Filter by Project</label>
      <select
       name="project"
       id="selectedProjectId"
       value={selectedProjectId}
        onChange={(e)=>{
          const value = e.target.value;
          setSelectedProjectId(
            value === "all"? "all" : Number(value)
          );
        }}
        >
          <option value="all">All Projects</option>
        {projects.map((project)=>(
          <option
          key={project.id}
           value = {project.id}
          >{project.name}</option>
        ))}
      </select>
    </div>

<div className="tasks-grid">
  {filteredTasks.length === 0 ? (
    <p>No tasks found for this project</p>
  ) : (
    filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
      />
    ))
  )}
</div>
  


</main>

) 
}

export default TasksPage