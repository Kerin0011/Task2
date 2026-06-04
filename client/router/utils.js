const legacyPathMap = {
  "/src/views/home.html": "/",
  "/src/views/login.html": "/login",
  "/src/views/register.html": "/register",
  "/src/views/dashboard.html": "/dashboard",
  "/src/views/tasks.html": "/tasks",
  "/src/views/task-form.html": "/task-form",
  "/src/views/profile.html": "/profile",
  "/src/views/admin.html": "/admin",
  "/src/views/not-found.html": "/404",
};

export function createTemplate(renderFn, bodyClass) {
  return {
    render: renderFn,
    bodyClass,
  };
}

export function normalizePath(path) {
  const url = new URL(path, window.location.href);
  const pathname = url.pathname.replace(/\/index\.html$/i, "/").replace(/\/+$/, "");
  return pathname === "" ? "/" : pathname;
}

export function resolveLegacyPath(path) {
  return legacyPathMap[path] || path;
}

export function buildFullPath(path) {
  const url = new URL(path, window.location.href);
  const resolved = resolveLegacyPath(url.pathname);
  return `${normalizePath(resolved)}${url.search}${url.hash}`;
}
