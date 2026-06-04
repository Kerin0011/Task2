# TaskFlowSPA

TaskFlowSPA is a learning-focused single page application built with vanilla JavaScript, HTML, CSS and Tailwind CSS. It simulates a modern task management system while showing how to structure a frontend app without using frameworks like React, Vue or Angular.

The app uses client-side routing with the History API to navigate between views without full page reloads. It includes login/logout flow, role-based access control, protected routes, dynamic page rendering, and a fake backend powered by `json-server`.

## Project overview

TaskFlowSPA is designed to teach:

- SPA routing and navigation
- modular frontend architecture
- separation of concerns
- authentication and authorization
- role-based route protection
- reusable components
- interaction with a fake backend
- simple state persistence with `localStorage`

## Features

- client-side SPA routing
- public and private routes
- `USER` and `ADMIN` roles
- login/logout flows
- session persistence in `localStorage`
- task CRUD operations
- profile editing and account deletion
- admin user management view
- 404 not found fallback
- fake backend data using `json-server`

## Architecture

The project follows a simple layered architecture that keeps responsibilities separated:

- `client/main.js` starts the application
- `client/router/` handles routing and guards
- `client/views/` contains page views
- `client/components/` holds reusable UI pieces
- `client/utils/` contains small helpers
- `client/styles/` contains global styling
- `api/` contains service logic and fake backend data

This structure keeps the app easy to understand and maintain while leaving room for future improvements.

## Roles and permissions

### `ADMIN`

- full access to the application
- can view all tasks
- can see and manage users
- has access to the admin panel

### `USER`

- can manage their own tasks only
- can edit their own profile
- can delete their own account
- sees only their own information

## Project structure

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
  db.json
```

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Running the app

Start the client app:

```bash
npm run dev
```

Start the fake API:

```bash
npm run api
```

Then open the local Vite URL shown in the terminal.

## Available scripts

- `npm run dev` - start the Vite development server for the client
- `npm run build` - build the client for production
- `npm run preview` - preview the production build
- `npm run api` - start the fake backend server using `json-server`

## Fake backend

The fake backend simulates the following resources:

- `users`
- `tasks`

It should support:

- login validation
- fetching the current user profile
- updating user profile data
- account deletion
- fetching tasks for the signed-in user
- creating, updating, and deleting tasks
- returning all tasks/users for admin views

## Session handling

The app keeps session state simple:

- authenticated user data is stored in `localStorage`
- the fake API stores `users` and `tasks`
- there is no real session store in the backend

This keeps the focus on SPA routing, auth flow, and role-based access.

## Contribution guidelines

- keep each module focused on a single responsibility
- do not mix view templates, business logic, and data access
- place API and storage logic under `api/`
- keep auth and route protection logic in the router or dedicated utilities
- use reusable components for repeated UI patterns
- avoid hardcoded HTML in multiple places

## Recommended development order

1. base SPA router
2. main layout
3. authentication module
4. session restoration
5. route guards
6. tasks CRUD
7. dashboard
8. admin panel

## License

This project is licensed under the terms described in [`LICENSE`](./LICENSE).
