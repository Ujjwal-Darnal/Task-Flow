import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../css/ProjectsPage.css"
import { useState } from "react";
import type { Project } from "../types/project";

function ProjectsPage() {
    const [projectList, setProjectList] = useState<Project[]>(projects);

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const [projectName, setProjectName] = useState("");

    const [projectDescription, setProjectDescription] = useState("");

    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

    //function to toggle 
  function toggleCreateForm() {
  setProjectName("");
  setProjectDescription("");
  setEditingProjectId(null);
  setShowCreateForm((prev) => !prev);
}
    //submision handler
    function handleSubmitProject() {
        const trimmedName = projectName.trim();

        if (trimmedName === "") return;

        // EDIT EXISTING PROJECT
        if (editingProjectId !== null) {
            setProjectList((prev) =>
                prev.map((project) =>
                    project.id === editingProjectId
                        ? {
                            ...project,
                            name: trimmedName,
                            description: projectDescription.trim(),
                        }
                        : project
                )
            );

        } else {
            // CREATE NEW PROJECT
            const newProject: Project = {
                id: Math.max(0, ...projectList.map((project) => project.id)) + 1,
                name: trimmedName,
                description: projectDescription.trim(),
                status: "Active",
                createdAt: new Date().toISOString().slice(0, 10),
                taskCount: 0,
            };

            setProjectList((prev) => [...prev, newProject]);
        }

        // RESET FORM
        setProjectName("");
        setProjectDescription("");
        setEditingProjectId(null);
        setShowCreateForm(false);
    }

    // ------ function to delete card
    function handleDeleteProject(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (!confirmed) {
            return;
        }

        setProjectList((prev) =>
            prev.filter((project) => project.id !== id))
    }

    // ---- function to change the status
    function handleStatusChange(
        id: number,
        newStatus: Project["status"]
    ) {
        setProjectList(prev =>
            prev.map(project => {
                if (project.id === id) {
                    return {
                        ...project,
                        status: newStatus
                    };
                } else {
                    return project;
                }
            })
        );
    }

    // ----- function to edit the project
    function handleEditProject(id: number) {
        const projectToEdit = projectList.find(
            (project) => project.id === id
        );
        if (!projectToEdit) return;

        setEditingProjectId(id);
        setProjectName(projectToEdit.name);
        setProjectDescription(projectToEdit.description);
        setShowCreateForm(true);
    }





    return (
        <div className="projects-page">
            <div className="projects-header">
                <div>
                    <h1>Projects</h1>
                    <p>Manage and organize your projects</p>
                </div>

                <button
                    type="button"
                    className="new-project-btn"
                    onClick={toggleCreateForm}
                >{showCreateForm ? "Cancel" : "+New Project"
                    }</button>
            </div>

            {showCreateForm ? <form
                className="create-project-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitProject();
                }}>
                <h2>
                    {editingProjectId !== null
                        ? "Edit Project"
                        : "Create New Project"}
                </h2>
                <label htmlFor="projectName" >Project Name</label>
                <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    placeholder="Enter project name"
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
                <label htmlFor="projectDescription" >
                    Project Description
                </label >
                <textarea
                    placeholder="Describe your project"
                    id="projectDescription"
                    name="projectDescription"
                    value={projectDescription}
                    onChange={
                        (e) => setProjectDescription(e.target.value)
                    }
                ></textarea>

                <button
                    className="create-project-submit"
                    type="submit"
                >  {editingProjectId !== null
                    ? "Save Changes"
                    : "Create Project"}</button>

            </form> : null}





            <div className="project-grid">
                {projectList.map((project) => {
                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleDeleteProject}
                            onStatusChange={handleStatusChange}
                            onEdit={handleEditProject}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectsPage;