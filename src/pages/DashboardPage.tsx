import type { Project } from "../types/project"
import type { Task } from "../types/task"
import StatCard from "../components/StatCard";
import "../css/StatCard.css"
import "../css/Dashboard.css"
import StatusBar from "../components/StatusBar";

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

const todoPercentage = totalTasks === 0
  ? 0
  : Math.round((totalTodoTasks / totalTasks) * 100);

const inProgressPercentage = totalTasks === 0
  ? 0
  : Math.round((totalInProgressTasks / totalTasks) * 100);


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

<section className="status-distribution">
  <h2>Task Status Distribution</h2>

  <StatusBar
    label="To Do"
    count={totalTodoTasks}
    percentage={todoPercentage}
    color="#94a3b8"
  />

  <StatusBar
    label="In Progress"
    count={totalInProgressTasks}
    percentage={inProgressPercentage}
    color="#f59e0b"
  />

  <StatusBar
    label="Completed"
    count={totalCompletedTasks}
    percentage={completionRate}
    color="#2563eb"
  />
</section>

 
        </main>
    )
}
export default DashboardPage

