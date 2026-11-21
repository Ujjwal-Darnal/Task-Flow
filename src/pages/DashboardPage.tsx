import type { Project } from "../types/project";
import type { Task } from "../types/task";
import StatCard from "../components/StatCard";
import StatusBar from "../components/StatusBar";

import "../css/StatCard.css";
import "../css/Dashboard.css";

interface DashboardPageProps {
  projectList: Project[];
  taskList: Task[];
}

function DashboardPage({
  projectList,
  taskList,
}: DashboardPageProps) {

  // Dashboard statistics
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

  // Calculate task percentages
  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((totalCompletedTasks / totalTasks) * 100);

  const todoPercentage =
    totalTasks === 0
      ? 0
      : Math.round((totalTodoTasks / totalTasks) * 100);

  const inProgressPercentage =
    totalTasks === 0
      ? 0
      : Math.round((totalInProgressTasks / totalTasks) * 100);

  // Get the three most recent tasks without mutating state
  const recentTasks = [...taskList]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  // Find the project associated with a task
  function getProjectName(projectId: number) {
    const project = projectList.find(
      project => project.id === projectId
    );

    return project?.name ?? "Unknown project";
  }

  return (
    <main className="dashboard-page">
      <h1>Dashboard</h1>

      {/* Dashboard statistics */}
      <div className="stats-grid">
        <StatCard
          title="Total Projects"
          value={totalProjects}
        />

        <StatCard
          title="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          title="To Do"
          value={totalTodoTasks}
        />

        <StatCard
          title="In Progress"
          value={totalInProgressTasks}
        />

        <StatCard
          title="Completed"
          value={totalCompletedTasks}
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
        />
      </div>

      {/* Overall task progress */}
      <section className="progress-section">
        <h2>Overall Task Progress</h2>

        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Overall task progress"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <p>
          {totalCompletedTasks} of {totalTasks} tasks completed
        </p>
      </section>

      {/* Task status distribution */}
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

      {/* Recent tasks */}
      <section className="recent-tasks">
        <h2>Recent Tasks</h2>

        {recentTasks.length === 0 ? (
          <p className="recent-tasks-empty">
            No tasks yet. Create a task to see it here.
          </p>
        ) : (
          recentTasks.map(task => (
            <div className="recent-task" key={task.id}>

              {/* Recent task header */}
              <div className="recent-task-header">

                <div className="recent-task-info">
                  <h3>{task.title}</h3>
                  <p>{getProjectName(task.projectId)}</p>
                </div>

                <span
                  className={`recent-task-status ${task.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {task.status}
                </span>

              </div>

              {/* Recent task footer */}
              <div className="recent-task-footer">

                <span>
                  Created{" "}
                  <time dateTime={task.createdAt}>
                    {task.createdAt}
                  </time>
                </span>

                <span
                  className={`recent-task-priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority} priority
                </span>

              </div>

            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default DashboardPage;