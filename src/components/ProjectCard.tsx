import type { Project } from "../types/project";
import "../css/ProjectCard.css"
import "../css/index.css"
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h2>{project.name}</h2>

      <p>{project.description}</p>      
                                            
     
       <p>
        Status: <span>{project.status}</span>
      </p>      

      <p>Tasks: {project.taskCount}</p>

      <p>
        Created: <time>{project.createdAt}</time>
      </p>
    
    </article>
  );
}

export default ProjectCard;