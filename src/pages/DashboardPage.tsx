import type { Project } from "../types/project"
import type { Task } from "../types/task"
import StatCard from "../components/StatCard";
import "../css/StatCard.css"
import "../css/Dashboard.css"
interface DashboardPageProps{
    projectList:Project[];
    taskList:Task[]
}
function DashboardPage({projectList,
    taskList}:DashboardPageProps
){
    const totalProjects = projectList.length;
    const totalTasks = taskList.length;

    
const totalCompletedTasks = taskList.filter(
  task => task.status === "Done"
).length;

const totalInProgressTasks = taskList.filter(
  task => task.status === "In Progress"
).length;

const totalTodoTasks = taskList.filter(
  task => task.status === "To Do"
).length;

const completionRate = totalTasks === 0? 0:
Math.round((totalCompletedTasks/totalTasks)*100);


    return(
        <main className="dashboard-page">
            <h1>Dashboard</h1>

        <div className="stats-grid">
  <StatCard title="Total Projects" value={totalProjects} />
  <StatCard title="Total Tasks" value={totalTasks} />
  <StatCard title="To Do" value={totalTodoTasks} />
  <StatCard title="In Progress" value={totalInProgressTasks} />
  <StatCard title="Completed" value={totalCompletedTasks} />
  <StatCard title="Completion Rate" value={`${completionRate}%`} />
</div>

<section className="progress-section">
  <h2>Overall Task Progress</h2>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${completionRate}%` }}
    />
  </div>

  <p>
    {totalCompletedTasks} of {totalTasks} tasks completed
  </p>
</section>
 
        </main>
    )
}
export default DashboardPage

