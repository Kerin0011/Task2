import { loadData, saveData, removeData, createId } from "./storageService.js";

const API_BASE = "http://localhost:3000";
const USERS_KEY = "users";
const SESSION_KEY = "session";

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

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

export async function initializeUsers() {
  const users = await requestJson("/users");
  saveData(USERS_KEY, Array.isArray(users) ? users : []);
}

export function getAllUsers() {
  return loadData(USERS_KEY, []);
}

export function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id) {
  const users = getAllUsers();
  return users.find((user) => user.id === id);
}

export function getSession() {
  return loadData(SESSION_KEY, null);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session?.userId) {
    return null;
  }
  const user = getUserById(session.userId);
  return user ? sanitizeUser(user) : null;
}

export function login(credentials) {
  const user = findUserByEmail(credentials.email);
  if (!user || user.password !== credentials.password) {
    return null;
  }

  saveData(SESSION_KEY, { userId: user.id });
  return sanitizeUser(user);
}

export function logout() {
  removeData(SESSION_KEY);
}

async function persistUser(newUser) {
  await requestJson("/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
}

async function persistUpdatedUser(user) {
  await requestJson(`/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

async function deleteUserFromServer(userId) {
  await requestJson(`/users/${userId}`, {
    method: "DELETE",
  });
}

export function registerUser(payload) {
  const existingUser = findUserByEmail(payload.email);
  if (existingUser) {
    return {
      success: false,
      message: "Ya existe un usuario con ese correo.",
    };
  }

  const users = getAllUsers();
  const newUser = {
    id: createId("user"),
    name: payload.name,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
    role: payload.role || "USER",
  };

  users.push(newUser);
  saveData(USERS_KEY, users);
  saveData(SESSION_KEY, { userId: newUser.id });
  persistUser(newUser).catch((error) => {
    console.error("No se pudo guardar el usuario en db.json:", error);
  });

  return {
    success: true,
    user: sanitizeUser(newUser),
  };
}

export function updateCurrentUser(updates) {
  const session = getSession();
  if (!session?.userId) {
    return null;
  }

  const users = getAllUsers();
  const index = users.findIndex((user) => user.id === session.userId);
  if (index === -1) {
    return null;
  }

  const updatedUser = {
    ...users[index],
    name: updates.name ?? users[index].name,
    lastName: updates.lastName ?? users[index].lastName,
    email: updates.email ?? users[index].email,
    password: updates.password ? updates.password : users[index].password,
  };

  if (updatedUser.email !== users[index].email) {
    const conflict = users.find((user) => user.email.toLowerCase() === updatedUser.email.toLowerCase());
    if (conflict) {
      return {
        success: false,
        message: "El correo ya esta en uso por otro usuario.",
      };
    }
  }

  users[index] = updatedUser;
  saveData(USERS_KEY, users);
  persistUpdatedUser(updatedUser).catch((error) => {
    console.error("No se pudo actualizar el usuario en db.json:", error);
  });
  return {
    success: true,
    user: sanitizeUser(updatedUser),
  };
}

export function deleteCurrentUser() {
  const session = getSession();
  if (!session?.userId) {
    return false;
  }

  let users = getAllUsers();
  users = users.filter((user) => user.id !== session.userId);
  saveData(USERS_KEY, users);
  deleteUserFromServer(session.userId).catch((error) => {
    console.error("No se pudo eliminar el usuario de db.json:", error);
  });
  logout();
  return true;
}

export function deleteUserById(userId) {
  if (!userId) {
    return false;
  }

  const session = getSession();
  if (session?.userId === userId) {
    return {
      success: false,
      message: "No puedes eliminar tu propia cuenta desde aquí. Usa tu perfil para hacerlo.",
    };
  }

  let users = getAllUsers();
  users = users.filter((user) => user.id !== userId);
  saveData(USERS_KEY, users);
  deleteUserFromServer(userId).catch((error) => {
    console.error("No se pudo eliminar el usuario de db.json:", error);
  });

  return {
    success: true,
    message: "Usuario eliminado correctamente.",
  };
}
