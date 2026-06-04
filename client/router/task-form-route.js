import { render as renderTaskForm, task_formBodyClass } from "../views/task/task-form.js";
import { getCurrentUser } from "../../api/authService.js";
import { getTaskById, saveTask } from "../../api/taskService.js";
import { createTemplate } from "./utils.js";

function setupTaskForm(navigate) {
  const user = getCurrentUser();
  if (!user) return;

  const queryParams = new URLSearchParams(window.location.search);
  const taskId = queryParams.get("id");
  const task = taskId ? getTaskById(taskId) : null;

  const form = document.querySelector("form");
  const titleField = form.querySelector("#title");
  const descriptionField = form.querySelector("#description");
  const statusField = form.querySelector("#status");
  const dateField = form.querySelector("#date");
  const saveButton = document.querySelector("#task-submit");
  const cancelButton = document.querySelector("#task-cancel");

  if (task) {
    titleField.value = task.title;
    descriptionField.value = task.description;
    statusField.value = task.status;
    dateField.value = task.dueDate;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const doSave = () => {
    const payload = {
      id: task?.id,
      userId: user.id,
      title: titleField.value.trim(),
      description: descriptionField.value.trim(),
      status: statusField.value,
      dueDate: dateField.value,
    };

    if (!payload.title) {
      alert("El titulo es obligatorio.");
      return;
    }

    saveTask(payload);
    navigate("/tasks");
  };

  if (saveButton) {
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      doSave();
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("/tasks");
    });
  }
}

export const taskFormRoute = {
  title: "Formulario de tarea | TaskFlowSPA",
  template: createTemplate(renderTaskForm, task_formBodyClass),
  auth: true,
  admin: false,
  setup: setupTaskForm,
};
