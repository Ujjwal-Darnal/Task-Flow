import { tasks } from "../data/tasks";
import TaskCard from "../components/TaskCard"
import { useState } from "react";
import { projects } from "../data/projects";
import "../css/TasksPage.css"
import type { Task } from "../types/task";

function TasksPage(){

const [selectedProjectId,setSelectedProjectId] = useState<number | "all">("all");

const[taskList,setTaskList] = useState<Task[]>(tasks);

const filteredTasks = taskList.filter((task) => selectedProjectId=== "all" ? true:task.projectId === selectedProjectId);

// function to update the status
    function handleTaskStatusChange(
      id:number,
      newStatus: Task["status"]
    ){
      setTaskList(prev=>
        prev.map(task=>{
          if(task.id === id){
            return{
              ...task,status:newStatus
            };
          }else{
            return task;
          }
        })
      )
    }

// function to update the priority 
function handleTaskPriorityChange(
  id:number,
  newPriority:Task["priority"]
){
 setTaskList(prev=>
        prev.map(task=>{
          if(task.id === id){
            return{
              ...task,priority:newPriority
            };
          }else{
            return task;
          }
        })
      )
}
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
        onStatusChange = {handleTaskStatusChange}
        onPriorityChange = {handleTaskPriorityChange}
      />
    ))
  )}
</div>
  


</main>

) 
}

export default TasksPage