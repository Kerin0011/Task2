import { render as renderAdmin, adminBodyClass } from "../views/users/admin.js";
import { getAllUsers, deleteUserById } from "../../api/authService.js";
import { createTemplate } from "./utils.js";

function setupAdmin() {
  const usersContainer = document.querySelector("#admin-users-list");
  if (!usersContainer) return;

  const renderUsersList = () => {
    const users = getAllUsers();
    usersContainer.innerHTML = users
      .map(
        (user) => `
          <div class="rounded-2xl bg-blue-50 p-4">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div class="flex-1">
                <p class="font-bold text-slate-900">${user.name} ${user.lastName}</p>
                <p class="text-sm text-slate-500">${user.email}</p>
              </div>
              <div class="flex gap-2">
                <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${user.role}</span>
                <button data-action="delete-user" data-id="${user.id}" class="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50">Eliminar</button>
              </div>
            </div>
          </div>
        `,
      )
      .join("");

    usersContainer.querySelectorAll("button[data-action='delete-user']").forEach((button) => {
      button.addEventListener("click", () => {
        const userId = button.dataset.id;
        const confirmed = confirm(
          "¿Seguro que quieres eliminar este usuario? Esta accion no se puede deshacer."
        );
        if (!confirmed) return;

        const result = deleteUserById(userId);
        if (result.success) {
          renderUsersList();
        } else {
          alert(result.message);
        }
      });
    });
  };

  renderUsersList();
}

export const adminRoute = {
  title: "Panel administrativo | TaskFlowSPA",
  template: createTemplate(renderAdmin, adminBodyClass),
  auth: true,
  admin: true,
  setup: setupAdmin,
};
