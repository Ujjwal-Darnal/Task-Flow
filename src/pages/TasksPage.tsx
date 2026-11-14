import { tasks } from "../data/tasks";
import TaskCard from "../components/TaskCard"
import { useState } from "react";
import { projects } from "../data/projects";
import "../css/TasksPage.css"
import type { Task } from "../types/task";

function TasksPage(){

const [selectedProjectId,setSelectedProjectId] = useState<number | "all">("all");

const[taskList,setTaskList] = useState<Task[]>(tasks);

const[showCreateTaskForm,setShowCreateTaskForm] = useState <boolean>(false);

const[taskTitle,setTaskTitle] = useState<string>("");

const[taskDescription,setTaskDescription] = useState<string>("");

const[taskProjectId,setTaskProjectId] = useState<number | "">("");

const[taskStatus,setTaskStatus] = useState<Task["status"]>("To Do")

const[taskPriority,setTaskPriority] = useState<Task["priority"]>("Medium")


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
// Submiission handler
function handleCreateTask(
  e:React.SubmitEvent<HTMLFormElement>
){
  e.preventDefault();
  const trimmedTitle = taskTitle.trim()
  if(!trimmedTitle){
    alert("Task title is required");
    return;
  }

  if (taskProjectId === ""){
    alert("please select a project");
    return;
  }

  const newTask:Task = {
    id:Math.max(0,...taskList.map(task => task.id))+1,
    projectId:taskProjectId,
    title: trimmedTitle,
    description:taskDescription.trim(),
    status:taskStatus,
    priority:taskPriority,
    createdAt: new Date().toISOString().slice(0, 10),
    
  }
  //Add the task to react state
  setTaskList(prev=>[
    ...prev,newTask
  ])

 // Reset the form after creating a task
setTaskDescription("");
setTaskTitle("");
setTaskProjectId("");
setTaskPriority("Medium");
setTaskStatus("To Do");
setShowCreateTaskForm(false);
}
return(
<main className="tasks-page">
    <h1>Tasks</h1>

    {/* Project Filter */}
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

{/*  -- toggle the create task form */}
    <button 
    type="button"
    className="new-task-btn"
    onClick={()=> setShowCreateTaskForm(prev=>!prev)}
    >{showCreateTaskForm?"Cancel":"+ New Task"}</button>

{/* ----- Render the form only when the user chooses to create a task */}
    {showCreateTaskForm && (
      <form 
      className="create-task-form"
      onSubmit={handleCreateTask}>
        {/* ------  Task Title */}
      <label htmlFor="taskTitle">Task Title</label>
      <input 
      type="text"
      id="taskTitle"
      value={taskTitle}
      placeholder="Enter the name of task"
      onChange={(e)=>setTaskTitle(e.target.value)} />
{/*  ----- Task Description */}
      <label 
      htmlFor="taskDescription"
      >Task Description</label>
      <textarea 
       id="taskDescription"
       value={taskDescription}
       onChange={(e)=>setTaskDescription(e.target.value)
        
       }
        />

        {/* associate the new task with an existing project */}
        <label htmlFor="taskProjectId">Project</label>

<select
  id="taskProjectId"
  value={taskProjectId}
  onChange={(e) => {
    const value = e.target.value;

    setTaskProjectId(
      value === "" ? "" : Number(value)
    );
  }}
  required
>
  <option value="">Select a project</option>

  {projects.map((project) => (
    <option
      key={project.id}
      value={project.id}
    >
      {project.name}
    </option>
  ))}
</select>

{/* set the initial status fo the new task */}
<label htmlFor="taskStatus">Status</label>
<select 
id="taskStatus"
value={taskStatus}
onChange={(e) => {
  setTaskStatus(e.target.value as Task["status"]);
}
}
>

<option value="To Do">To Do</option>
<option value="In Progress">In Progress</option>
<option value="Done">Done</option>
</select>

{/* set the initial priority of the new Task */}
<label htmlFor="taskPriority">Priority</label>
<select
id="taskPriority"
value={taskPriority}
onChange={(e)=>{
  setTaskPriority(e.target.value as Task["priority"]);
}}
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

<button type="submit">Create Task</button>
      </form>
    )}


{/* Display filtered tasks or an empty-state message */}
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