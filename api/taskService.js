import { loadData, saveData, createId } from "./storageService.js";

const API_BASE = "http://localhost:3000";
const TASKS_KEY = "tasks";

async function requestJson(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
}

export async function initializeTasks() {
  const tasks = await requestJson("/tasks");
  saveData(TASKS_KEY, Array.isArray(tasks) ? tasks : []);
}

export function getAllTasks() {
  return loadData(TASKS_KEY, []);
}

export function getTasksForUser(user) {
  const tasks = getAllTasks();
  if (!user) {
    return [];
  }
  if (user.role === "ADMIN") {
    return tasks;
  }
  return tasks.filter((task) => task.userId === user.id);
}

export function getTaskById(taskId) {
  const tasks = getAllTasks();
  return tasks.find((task) => task.id === taskId) || null;
}

async function persistTask(task) {
  await requestJson("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

async function updateTaskOnServer(task) {
  await requestJson(`/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
}

async function deleteTaskFromServer(taskId) {
  await requestJson(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export function saveTask(taskPayload) {
  const tasks = getAllTasks();
  const existingIndex = tasks.findIndex((task) => task.id === taskPayload.id);

  if (existingIndex >= 0) {
    tasks[existingIndex] = {
      ...tasks[existingIndex],
      ...taskPayload,
    };
    updateTaskOnServer(tasks[existingIndex]).catch((error) => {
      console.error("No se pudo actualizar la tarea en db.json:", error);
    });
  } else {
    const newTask = {
      ...taskPayload,
      id: createId("task"),
    };
    tasks.push(newTask);
    persistTask(newTask).catch((error) => {
      console.error("No se pudo guardar la tarea en db.json:", error);
    });
  }

  saveData(TASKS_KEY, tasks);
  return true;
}

export function deleteTask(taskId) {
  const tasks = getAllTasks();
  const filtered = tasks.filter((task) => task.id !== taskId);
  saveData(TASKS_KEY, filtered);
  deleteTaskFromServer(taskId).catch((error) => {
    console.error("No se pudo eliminar la tarea de db.json:", error);
  });
}
