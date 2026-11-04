import type { Task } from "../types/task";
import  "../css/TaskCard.css"

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
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
          disabled
          
          
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
          disabled
          
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
    </article>
  );
}

export default TaskCard;