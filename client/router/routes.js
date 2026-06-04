import { publicRoutes } from "./public-routes.js";
import { protectedRoutes } from "./protected-routes.js";
import { normalizePath, resolveLegacyPath, buildFullPath } from "./utils.js";

export const mainRoutes = {
  ...publicRoutes,
  ...protectedRoutes,
};

export function getRouteForPath(path) {
  const url = new URL(path, window.location.href);
  const resolved = normalizePath(resolveLegacyPath(url.pathname));
  return mainRoutes[resolved] || mainRoutes["/404"];
}

export { normalizePath, resolveLegacyPath, buildFullPath };
