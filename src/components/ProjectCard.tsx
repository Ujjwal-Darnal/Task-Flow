import type { Project } from "../types/project";
import "../css/ProjectCard.css"
import "../css/index.css"
interface ProjectCardProps {
  project: Project;
  onDelete:(id:number) => void;
  onStatusChange:(id:number,status:Project["status"])=>void;
}

function ProjectCard({ project,onDelete,onStatusChange }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h2>{project.name}</h2>

      <p>{project.description}</p>      
                                            
     
     <div className="project-status">
  <label htmlFor={`project-status-${project.id}`}>
    Status:
  </label>

  <select
    id={`project-status-${project.id}`}
    name="status"
    value={project.status}
    onChange={(e) =>
      onStatusChange(project.id, e.target.value as Project["status"])
    }
  >
    <option value="Active">Active</option>
    <option value="Completed">Completed</option>
    <option value="Archived">Archived</option>
  </select>
</div>

      <p>Tasks: {project.taskCount}</p>

      <p>
  Created: (
    <time dateTime={project.createdAt}>
      {project.createdAt}
    </time>
  )
</p>
    
    <button
  type="button"
  onClick={() => onDelete(project.id)}
  aria-label={`Delete ${project.name}`}
>
  Delete
</button>
    </article>
  );
}

export default ProjectCard; 