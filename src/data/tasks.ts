import type { Task } from "../types/task";

export const tasks:Task[] = [
    {
  id: 1,
  projectId: 2,
  title: "Build login page",
  description: "Create a responsive login form",
  status: "To Do",
  priority: "High",
  createdAt: "2026-11-01"
},
{
  id: 2,
  projectId: 2,
  title: "Deploy login page",
  description: "Create a login page",
  status: "To Do",
  priority: "Medium",
  createdAt: "2023-11-01"
},
{
  id: 3,
  projectId: 1,
  title: "Website From React",
  description: "Make web page",
  status: "In Progress",
  priority: "Low",
  createdAt: "2025-11-01"
},
{
  id: 4,
  projectId: 1,
  title: "Ai and machine learning",
  description: "Build a prototype",
  status: "Done",
  priority: "Low",
  createdAt: "2024-11-01"
}

]

