# AGENTS.md

Guide for contributors and agents working on `TaskFlowSPA`.

## Project mission

Build a task management SPA with vanilla JavaScript, HTML, CSS, and Tailwind CSS. The app should teach modern frontend architecture, client-side routing, modular design, and access control without relying on a SPA framework.

## Architecture

This repository uses a simple layered frontend architecture designed for a learning SPA.

The goal is not to overengineer the structure, but to make responsibilities clear and easy to follow:

- `client/main.js` boots the application.
- `client/router/` manages navigation and route guards.
- `client/views/` contains page views.
- `client/components/` holds reusable UI pieces.
- `api/` handles data access, session management, and the fake backend.
- `client/utils/` contains small helper functions.
- `client/styles/` contains global styling.

## Repository priorities

1. Keep the application simple and easy to understand.
2. Separate view rendering, business logic, state, and data access.
3. Avoid tightly coupled solutions.
4. Preserve a smooth SPA experience with no full page reloads.
5. Validate roles, permissions and route protection consistently.

## Stack and constraints

- vanilla JavaScript with ES modules
- HTML and CSS
- Tailwind CSS for UI and layout
- Vite for development
- fake backend via `json-server`
- no React, Vue, Angular, or SPA frameworks

## Implementation principles

- Each module should have a clear responsibility.
- DOM manipulation should stay organized and predictable.
- Business logic should not be embedded inside large listeners or templates.
- Access to `localStorage`, remote APIs, or backend services should be wrapped in helpers or services.
- Authentication and permission validation should be centralized.

## Functional domains

### Authentication

- login and logout
- session persistence using `localStorage`
- restore session on refresh
- profile editing for the signed-in user
- user self-deletion

### Routing

- client-side navigation with the History API
- public and private routes
- 404 fallback route
- guards before rendering protected pages

### Tasks

- task listing
- create, edit, delete tasks
- optional filters/status view if implemented
- owner-only restrictions for `USER` role

### Administration

- admin-only access
- user management view
- global task view for admin
- role and permission management if included

## Base roles

### `ADMIN`

- full access to the system
- manages users
- sees all tasks
- adjusts roles and permissions

### `USER`

- manages only their own tasks
- views only their own data
- edits their own profile
- can delete their own account

## Suggested structure

Aim for an organization like this:

```text
client/
  main.js
  router/
  views/
  components/
  utils/
  styles/
api/
  authService.js
  taskService.js
  storageService.js
```

## Contribution criteria

- determine whether new code belongs in `router`, `views`, `components`, `services`, `utils`, or `styles`.
- move reusable pieces into `components`.
- move storage, API, or endpoint logic into `services`.
- keep authorization rules in the router or a small auth utility.
- avoid duplicating templates or logic when a simple abstraction will do.

## UI and rendering rules

- render views dynamically into a root container.
- use the SPA router for internal navigation, not full page reload links.
- use Tailwind CSS for consistent presentation.
- keep the UI clear, consistent, and readable.
- avoid mixing inline styles with logic unless there is a strong reason.

## Data and persistence rules

- the fake backend should be the main source of persistent data.
- `json-server` should manage `users` and `tasks`.
- active session data should persist in `localStorage`.
- encapsulate `localStorage` use in utilities or services.
- do not rely on hidden buttons for permission checks; enforce access in guards and actions.
- profile actions should be limited to the current user unless admin privileges explicitly allow otherwise.

## Quality expectations

- small functions with clear names
- cohesive modules
- easy-to-follow data flow
- comments only where they add real value
- avoid dead code and multipurpose files

## Recommended build order

1. base SPA router
2. main layout
3. authentication module
4. session handling
5. route guards
6. tasks CRUD
7. dashboard
8. admin panel

## What agents should avoid

- introducing SPA frameworks
- solving everything in one file
- coupling views to rigid data structures
- skipping role validation for convenience
- breaking SPA navigation with full page reloads

## Definition of success

A contribution is correct if it helps keep `TaskFlowSPA` as a modular, understandable, and scalable SPA with authentication, protected routes, clear roles, and task CRUD behavior aligned with user permissions.
