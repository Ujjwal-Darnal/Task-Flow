import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../css/ProjectsPage.css"
function ProjectsPage() {
    return (
        <div className="projects-page">
            <h1>Projects</h1>

            <div className="project-grid">
                {projects.map((project) => {
                return (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                );
            })}
            </div>
        </div>
    );
}

export default ProjectsPage;