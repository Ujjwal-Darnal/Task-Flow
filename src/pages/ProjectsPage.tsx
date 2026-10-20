import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../css/ProjectsPage.css"
import {useState} from "react";
import type { Project } from "../types/project";

function ProjectsPage() {
    const [projectList,setProjectList] = useState<Project[]>(projects);

    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const[projectName,setProjectName] = useState("");

    const[projectDescription,setProjectDescription] = useState("");

    //function to toggle 
    function toggleCreateForm(){
          if (showCreateForm) {
    setProjectName("");
    setProjectDescription("");
  }

        setShowCreateForm(prev=>!prev);
    }
//submision handler
function handleSubmitProject(){
    const trimmedName = projectName.trim();
    if(trimmedName === "")return;

    const newProject:Project
= {
    id: Math.max(0,...projectList.map((project)=>project.id))+1,
    name: trimmedName,
    description:projectDescription.trim(),
    status:"Active",
createdAt: new Date().toISOString().slice(0, 10), 
   taskCount:0,
};
setProjectList((prev)=>[...prev,newProject]);

setProjectName("");
setProjectDescription("");
setShowCreateForm(false);
}

// ------ function to delete card
function handleDeleteProject(id:number){
    const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
    );
    if(!confirmed){
        return;
    }

   setProjectList((prev) => 
prev.filter((project)=>project.id!==id))
}
    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <button onClick={toggleCreateForm}>{showCreateForm? "Cancel":"+New Project"}</button>

         { showCreateForm? <form
          onSubmit={(e)=>{e.preventDefault();
            handleSubmitProject();
          }}>
            <label htmlFor="projectName" >Project Name</label>
            <input
            id="projectName" 
            type="text" 
            value={projectName}
            onChange={(e)=>setProjectName(e.target.value)}
            />
             <label htmlFor="projectDescription" >
            Project Description
         </label >
         <textarea 
         id="projectDescription"
         name="projectDescription" 
         value = {projectDescription}
         onChange={
         (e)=>setProjectDescription(e.target.value)
         }
         ></textarea>

         <button type = "submit">Create Project</button>
         
         </form>:null}
        
         

         
            
            <div className="project-grid">
                {projectList.map((project) => {
                return (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onDelete={handleDeleteProject}
                    />
                );
            })}
            </div>
        </div>
    );
}

export default ProjectsPage;