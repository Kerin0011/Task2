export function tasksView() {
  return `
<header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">
          Crear tarea
        </a>
      </section>

      <section id="tasks-list" class="mt-8 grid gap-4"></section>
    </main>
  `;
}


export function render(container) {
  container.innerHTML = tasksView();
}

export const tasksBodyClass = `min-h-screen bg-sky-50 text-slate-800`;
