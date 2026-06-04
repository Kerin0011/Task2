import { dashboardRoute } from "./dashboard-route.js";
import { tasksRoute } from "./tasks-route.js";
import { taskFormRoute } from "./task-form-route.js";
import { profileRoute } from "./profile-route.js";
import { adminRoute } from "./admin-route.js";

export const protectedRoutes = {
  "/dashboard": dashboardRoute,
  "/tasks": tasksRoute,
  "/task-form": taskFormRoute,
  "/profile": profileRoute,
  "/admin": adminRoute,
};
