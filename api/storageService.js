const STORAGE_KEYS = {
  users: "taskflowspa.users",
  tasks: "taskflowspa.tasks",
  session: "taskflowspa.session",
};

export function loadData(key, fallback) {
  const raw = localStorage.getItem(STORAGE_KEYS[key]);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error parsing storage key ${key}:`, error);
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
}

export function removeData(key) {
  localStorage.removeItem(STORAGE_KEYS[key]);
}

export function createId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
