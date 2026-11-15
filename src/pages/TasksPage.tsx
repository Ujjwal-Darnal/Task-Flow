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

const[taskEditingId,setTaskEditingId] = useState<number|null>(null);

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

 if (taskEditingId !== null) {
  // Update the existing task
  setTaskList(prev =>
    prev.map(task =>
      task.id === taskEditingId
        ? {
            ...task,
            projectId: taskProjectId,
            title: trimmedTitle,
            description: taskDescription.trim(),
            status: taskStatus,
            priority: taskPriority,
          }
        : task
    )
  );
} else {
  // Create a new task
  const newTask: Task = {
    id: Math.max(0, ...taskList.map(task => task.id)) + 1,
    projectId: taskProjectId,
    title: trimmedTitle,
    description: taskDescription.trim(),
    status: taskStatus,
    priority: taskPriority,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  // Add the task to react state
  setTaskList(prev => [...prev, newTask]);
}


  
 // Reset the form after creating a task
resetTaskForm();
setShowCreateTaskForm(false);
}

// function to reset the task form
function resetTaskForm(){
 
    setTaskDescription("");
setTaskTitle("");
setTaskProjectId("");
setTaskPriority("Medium");
setTaskStatus("To Do");
setTaskEditingId(null);
  
}

// function to delete the task
function handleDeleteTask(id:number){
const confirmed = window.confirm(
  "Are you sure! you want to delete the task"
)
if(!confirmed){
  return;
}

setTaskList((prev)=>(
  prev.filter((task)=>task.id!== id)
))
}

// function to edit task
function handleEditTask(id:number){
  const taskToEdit = taskList.find((task)=>task.id===id);
  if(!taskToEdit) return;

  setTaskEditingId(id);
  setTaskTitle(taskToEdit.title);
  setTaskPriority(taskToEdit.priority);
  setTaskDescription(taskToEdit.description);
  setTaskStatus(taskToEdit.status);
  setTaskProjectId(taskToEdit.projectId);
  setShowCreateTaskForm(true);

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
    onClick={()=>{
      resetTaskForm(); setShowCreateTaskForm(prev=>!prev)}}
    >{showCreateTaskForm?"Cancel":"+ New Task"}</button>

{/* ----- Render the form only when the user chooses to create a task */}
    {showCreateTaskForm && (
      <form 
      className="create-task-form"
      onSubmit={handleCreateTask}>
        {/* ------  Task Title */}
        <h2>
  {taskEditingId !== null
    ? "Edit Task"
    : "Create New Task"}
</h2>
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

<button 
className="create-task-submit"
type="submit">
  {taskEditingId!==null? "Save Changes":"Create Task"}
</button>
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
        onDeleteTask = {handleDeleteTask}
        onEditTask = {handleEditTask}
      />
    ))
  )}
</div>
  


</main>

) 
}

export default TasksPage