import { render as renderDashboard, dashboardBodyClass } from "../views/app/dashboard.js";
import { logout, getCurrentUser } from "../../api/authService.js";
import { getTasksForUser } from "../../api/taskService.js";
import { showLoginSuccessAlert } from "../components/alerts.js";
import { createTemplate } from "./utils.js";

function setupDashboard(navigate) {
  const user = getCurrentUser();
  if (!user) return;

  const greeting = document.querySelector("#dashboard-username");
  if (greeting) {
    greeting.textContent = `${user.name} ${user.lastName || ""}`.trim();
  }

  const tasks = getTasksForUser(user);
  const counts = {
    active: tasks.filter((task) => task.status !== "Completada").length,
    completed: tasks.filter((task) => task.status === "Completada").length,
    dueToday: tasks.filter((task) => !!task.dueDate).length,
  };

  const activeNode = document.querySelector("#dashboard-active-count");
  const completedNode = document.querySelector("#dashboard-completed-count");
  const dueTodayNode = document.querySelector("#dashboard-due-count");

  if (activeNode) activeNode.textContent = `${counts.active}`;
  if (completedNode) completedNode.textContent = `${counts.completed}`;
  if (dueTodayNode) dueTodayNode.textContent = `${counts.dueToday}`;

  const logoutButton = document.querySelector("#logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
      navigate("/login");
    });
  }

  const justLoggedIn = sessionStorage.getItem("justLoggedIn");
  if (justLoggedIn === "true") {
    sessionStorage.removeItem("justLoggedIn");
    showLoginSuccessAlert();
  }
}

export const dashboardRoute = {
  title: "Dashboard | TaskFlowSPA",
  template: createTemplate(renderDashboard, dashboardBodyClass),
  auth: true,
  admin: false,
  setup: setupDashboard,
};
