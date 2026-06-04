import { render as renderHome, homeBodyClass } from "../views/home.js";
import { render as renderLogin, loginBodyClass } from "../views/auth/login.js";
import { render as renderRegister, registerBodyClass } from "../views/auth/register.js";
import { render as renderNotFound, not_foundBodyClass } from "../views/auth/not-found.js";

import { login, registerUser } from "../../api/authService.js";
import { createTemplate } from "./utils.js";

function setupHome() {}

function setupLogin(navigate) {
  const form = document.querySelector("form");
  if (!form) return;

  const emailField = form.querySelector("#email");
  const passwordField = form.querySelector("#password");
  const submitLink = document.querySelector("#login-submit");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const doLogin = () => {
    const user = login({
      email: emailField.value.trim(),
      password: passwordField.value.trim(),
    });

    if (!user) {
      alert("Credenciales inválidas. Verifica tu correo y contraseña.");
      return;
    }

    sessionStorage.setItem("justLoggedIn", "true");
    navigate("/dashboard");
  };

  if (submitLink) {
    submitLink.addEventListener("click", (event) => {
      event.preventDefault();
      doLogin();
    });
  }
}

function setupRegister(navigate) {
  const form = document.querySelector("form");
  if (!form) return;

  const nameField = form.querySelector("#register-name");
  const lastNameField = form.querySelector("#register-lastname");
  const emailField = form.querySelector("#register-email");
  const passwordField = form.querySelector("#register-password");
  const roleField = form.querySelector("#register-role");
  const submitLink = document.querySelector("#register-submit");
  const backButton = document.querySelector("#register-back");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const doRegister = () => {
    const result = registerUser({
      name: nameField.value.trim(),
      lastName: lastNameField.value.trim(),
      email: emailField.value.trim(),
      password: passwordField.value.trim(),
      role: roleField.value,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    navigate("/dashboard");
  };

  if (submitLink) {
    submitLink.addEventListener("click", (event) => {
      event.preventDefault();
      doRegister();
    });
  }

  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("/", true);
    });
  }
}

function setupNotFound() {}

export const publicRoutes = {
  "/": {
    title: "Home | TaskFlowSPA",
    template: createTemplate(renderHome, homeBodyClass),
    auth: false,
    admin: false,
    setup: setupHome,
  },
  "/login": {
    title: "Login | TaskFlowSPA",
    template: createTemplate(renderLogin, loginBodyClass),
    auth: false,
    admin: false,
    setup: setupLogin,
  },
  "/register": {
    title: "Registro | TaskFlowSPA",
    template: createTemplate(renderRegister, registerBodyClass),
    auth: false,
    admin: false,
    setup: setupRegister,
  },
  "/404": {
    title: "404 | TaskFlowSPA",
    template: createTemplate(renderNotFound, not_foundBodyClass),
    auth: false,
    admin: false,
    setup: setupNotFound,
  },
};
