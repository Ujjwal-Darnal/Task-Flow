import type { Task } from "../types/task";
import  "../css/TaskCard.css"

interface TaskCardProps {
  task: Task;
  onStatusChange:(
    id:number,
    newStatus:Task["status"]
  )=>void;
  onPriorityChange:(
    id:number,
    newPriority:Task["priority"]
  )=>void;
  onDeleteTask:(id:number)=>void
  onEditTask:(id:number)=>void
}

function TaskCard({ task,onStatusChange,onPriorityChange,onDeleteTask,onEditTask }: TaskCardProps) {
  return (
    <article className="task-card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      {/* Task Status */}
      <div className="task-status">
        <label htmlFor={`task-status-${task.id}`}>
          Status:
        </label>

        <select
          name="status"
          id={`task-status-${task.id}`}
          value={task.status}
          onChange={(e)=>
            onStatusChange(task.id,e.target.value as Task["status"])
          }
          
          
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Task Priority */}
      <div className="task-priority">
        <label htmlFor={`task-priority-${task.id}`}>
          Priority:
        </label>

        <select
          name="priority"
          id={`task-priority-${task.id}`}
          value={task.priority}
          onChange={(e)=>
            onPriorityChange(task.id,e.target.value as Task["priority"])
          }
          
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Task Created Date */}
      <div className="task-meta">
        <p>
          Created:{" "}
          <time dateTime={task.createdAt}>
            {task.createdAt}
          </time>
        </p>
      </div>

      <div className="task-footer">
        <button
        className="delete-task-btn"
        onClick={()=>onDeleteTask(task.id)}
        aria-label={`Delete ${task.title}`}>
        Delete
        </button>

        <button
        className="edit-task-btn"
        onClick={()=>onEditTask(task.id)}
        aria-label={`Edit ${task.title}`}>Edit</button>
      </div>
    </article>
  );
}

export default TaskCard;