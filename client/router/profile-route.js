import { render as renderProfile, profileBodyClass } from "../views/users/profile.js";
import { getCurrentUser, updateCurrentUser, deleteCurrentUser } from "../../api/authService.js";
import { createTemplate } from "./utils.js";

function setupProfile(navigate) {
  const user = getCurrentUser();
  if (!user) return;

  const form = document.querySelector("form");
  const nameField = form.querySelector("#name");
  const lastNameField = form.querySelector("#profile-lastname");
  const emailField = form.querySelector("#profile-email");
  const passwordField = form.querySelector("#password-new");
  const saveButton = document.querySelector("#profile-save");
  const deleteButton = document.querySelector("#profile-delete");

  if (nameField) nameField.value = user.name;
  if (lastNameField) lastNameField.value = user.lastName || "";
  if (emailField) emailField.value = user.email;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  if (saveButton) {
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      const result = updateCurrentUser({
        name: nameField.value.trim(),
        lastName: lastNameField.value.trim(),
        email: emailField.value.trim(),
        password: passwordField.value.trim(),
      });
      if (!result.success) {
        alert(result.message);
        return;
      }
      alert("Perfil actualizado correctamente.");
      navigate("/profile");
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const confirmed = confirm(
        "¿Seguro que quieres eliminar tu cuenta? Esta accion no se puede deshacer."
      );
      if (!confirmed) {
        return;
      }
      deleteCurrentUser();
      navigate("/login");
    });
  }
}

export const profileRoute = {
  title: "Mi perfil | TaskFlowSPA",
  template: createTemplate(renderProfile, profileBodyClass),
  auth: true,
  admin: false,
  setup: setupProfile,
};
