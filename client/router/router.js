import { getRouteForPath, normalizePath, resolveLegacyPath, buildFullPath, mainRoutes } from "./routes.js";
import { getCurrentUser } from "../../api/authService.js";

let appContainer = null;
let currentPath = null;

export function navigateTo(path, replace = false) {
  const fullPath = buildFullPath(path);
  if (fullPath === currentPath) {
    renderRoute(fullPath);
    return;
  }

  if (replace) {
    history.replaceState({}, "", fullPath);
  } else {
    history.pushState({}, "", fullPath);
  }
  renderRoute(fullPath);
}

function renderRoute(path) {
  currentPath = path;
  const route = getRouteForPath(path);
  const user = getCurrentUser();

  if (route.auth && !user) {
    navigateTo("/login", true);
    return;
  }

  const url = new URL(path, window.location.href);
  const pathname = normalizePath(resolveLegacyPath(url.pathname));

  if (!route.auth && user && ["/login", "/register"].includes(pathname)) {
    // Usar replaceState para no permitir volver atrás a login/register cuando hay sesión
    history.replaceState({}, "", "/dashboard");
    currentPath = "/dashboard";
    renderRoute("/dashboard");
    return;
  }

  if (route.admin && user?.role !== "ADMIN") {
    navigateTo(user ? "/dashboard" : "/login", true);
    return;
  }

  if (!appContainer) {
    console.warn("App container no inicializado.");
    return;
  }

  document.title = route.title;
  document.body.className = route.template.bodyClass;
  route.template.render(appContainer);
  updateAdminNavVisibility(user);
  if (typeof route.setup === "function") {
    route.setup(navigateTo);
  }
}

function updateAdminNavVisibility(user) {
  document.querySelectorAll('a[href="/admin"]').forEach((link) => {
    link.style.display = user?.role === "ADMIN" ? "" : "none";
  });
}

function handleLinkClick(event) {
  const anchor = event.target.closest("a");
  if (!anchor) {
    return;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return;
  }

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    return;
  }

  const normalized = normalizePath(resolveLegacyPath(url.pathname));
  if (Object.prototype.hasOwnProperty.call(mainRoutes, normalized) || normalized === "/") {
    event.preventDefault();
    navigateTo(`${url.pathname}${url.search}${url.hash}`);
  }
}

export function setupRouter(rootElement) {
  appContainer = rootElement;
  window.addEventListener("popstate", () => renderRoute(`${window.location.pathname}${window.location.search}${window.location.hash}`));
  document.addEventListener("click", handleLinkClick);
  renderRoute(`${window.location.pathname}${window.location.search}${window.location.hash}`);
}
