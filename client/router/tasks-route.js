import { render as renderTasks, tasksBodyClass } from "../views/task/tasks.js";
import { getCurrentUser } from "../../api/authService.js";
import { getTasksForUser, deleteTask } from "../../api/taskService.js";
import { createTemplate } from "./utils.js";

function setupTasks(navigate) {
  const user = getCurrentUser();
  if (!user) return;

  const tasksList = document.querySelector("#tasks-list");
  if (!tasksList) return;

  const tasks = getTasksForUser(user);
  if (tasks.length === 0) {
    tasksList.innerHTML = `<div class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50 text-slate-600">No hay tareas registradas. Usa el formulario para crear una nueva tarea.</div>`;
    return;
  }

  tasksList.innerHTML = tasks
    .map(
      (task) => `
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
              <p class="mt-3 max-w-2xl text-slate-600">${task.description}</p>
              <p class="mt-3 text-sm text-slate-500">Fecha limite: ${task.dueDate || "No definida"}</p>
            </div>
            <div class="flex gap-3">
              <button data-action="edit-task" data-id="${task.id}" class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Editar</button>
              <button data-action="delete-task" data-id="${task.id}" class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Eliminar</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  tasksList.querySelectorAll("button[data-action='edit-task']").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`/task-form?id=${button.dataset.id}`);
    });
  });

  tasksList.querySelectorAll("button[data-action='delete-task']").forEach((button) => {
    button.addEventListener("click", () => {
      deleteTask(button.dataset.id);
      navigate("/tasks");
    });
  });
}

export const tasksRoute = {
  title: "Mis tareas | TaskFlowSPA",
  template: createTemplate(renderTasks, tasksBodyClass),
  auth: true,
  admin: false,
  setup: setupTasks,
};
