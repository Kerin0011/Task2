import "./styles/global.css";
import { initializeUsers } from "../api/authService.js";
import { initializeTasks } from "../api/taskService.js";
import { setupRouter } from "./router/router.js";

async function bootstrap() {
  await initializeUsers();
  await initializeTasks();

  const app = document.querySelector("#app");
  if (app) {
    setupRouter(app);
  } else {
    console.error("No se encontro el contenedor #app para la SPA.");
  }
}

bootstrap();
