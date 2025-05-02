# Project: Vite of the Three Kingdoms - My High-Level Plan

Here’s my streamlined guide for setting up a React monorepo with Vite, Module Federation, and a custom Nx plugin to build an efficient micro-frontend architecture.

---

## 1. Initializing My Workspace & Applications

I’ll start by setting up the Nx monorepo and generating React applications with Vite.

- **Initializing My Nx Workspace**  
  I create a new workspace with a React monorepo preset using pnpm.  
  ```bash
  npx create-nx-workspace@latest vite-of-the-three-kingdoms --preset=react-monorepo --packageManager=pnpm --nxCloud=skip
  cd vite-of-the-three-kingdoms
  ```

- **Generating My Applications**  
  I generate four React applications (`auroria`, `borealis`, `cygnus`, `shell`) with Vite as the bundler and Vitest for unit testing.  
  ```bash
  pnpx nx g @nx/react:app auroria --bundler=vite --e2eTestRunner=none --unitTestRunner=vitest --style=css --routing=false
  pnpx nx g @nx/react:app borealis --bundler=vite --e2eTestRunner=none --unitTestRunner=vitest --style=css --routing=false
  pnpx nx g @nx/react:app cygnus --bundler=vite --e2eTestRunner=none --unitTestRunner=vitest --style=css --routing=false
  pnpx nx g @nx/react:app shell --bundler=vite --e2eTestRunner=none --unitTestRunner=vitest --style=css --routing=true
  ```

- **Installing the Module Federation Plugin**  
  I add the Vite Module Federation plugin to enable micro-frontend support.  
  ```bash
  pnpm install vite-plugin-module-federation --save-dev
  ```

---

## 2. Developing My Custom Nx Plugin

I’ll create a custom Nx plugin to automate Module Federation setup.

- **Generating My Plugin Structure**  
  I scaffold a minimal Nx plugin under `libs/nx-mf-vite`.  
  ```bash
  pnpx nx g @nx/plugin:plugin nx-mf-vite --minimal --directory=libs --projectNameAndRootFormat=as-provided
  ```

- **Generating My Generator**  
  I add a generator to configure Vite Module Federation.  
  ```bash
  pnpx nx g @nx/plugin:generator setup-vite-mf --project=nx-mf-vite --unitTestRunner=vitest
  ```

- **Implementing My Generator Logic**  
  I implement the logic in `libs/nx-mf-vite/src/generators/setup-vite-mf/generator.ts` to automate `vite.config.ts` updates for host and remote configurations.

- **Building My Plugin**  
  I compile the plugin for use.  
  ```bash
  pnpx nx build nx-mf-vite
  ```

---

## 3. Configuring Module Federation

I use my custom plugin to set up Module Federation for the remote and host applications.

- **Configuring My Remotes**  
  I apply the generator to configure `auroria`, `borealis`, and `cygnus` as remote apps.  
  ```bash
  pnpx nx g @91life/nx-mf-vite:setup-vite-mf --project=auroria --type=remote
  pnpx nx g @91life/nx-mf-vite:setup-vite-mf --project=borealis --type=remote
  pnpx nx g @91life/nx-mf-vite:setup-vite-mf --project=cygnus --type=remote
  ```

- **Configuring My Host**  
  I set up the `shell` app as the host to consume remote components.  
  ```bash
  pnpx nx g @91life/nx-mf-vite:setup-vite-mf --project=shell --type=host
  ```

- **Adjusting My Development Ports**  
  I manually update ports in `vite.config.ts` or `project.json` for each app:  
  - `shell`: 3000  
  - `auroria`: 3001  
  - `borealis`: 3002  
  - `cygnus`: 3003  

- **Verifying My Remote URLs**  
  I update `apps/shell/vite.config.ts` to reference the correct remote URLs, e.g., `auroria@http://localhost:3001/assets/remoteEntry.js`.

---

## 4. Building My Application Features

I develop and integrate components for each application.

- **Creating My Components**  
  I manually create React components in their respective apps:  
  - `AuroriaMap.tsx` in `apps/auroria`  
  - `BorealisChart.tsx` in `apps/borealis`  
  - `CygnusDashboard.tsx` in `apps/cygnus`  

- **Updating My Exposes**  
  I modify `exposes` in each remote’s `vite.config.ts` to include new components (or re-run the generator if it supports updates).

- **Implementing My Shell**  
  In `apps/shell`, I use `React.lazy` and `Suspense` to dynamically load remote components.

---

## 5. Verifying and Testing My Setup

I test the applications to ensure Module Federation and HMR work as expected.

- **Serving My Remote Apps**  
  I run each remote app in separate terminals.  
  ```bash
  pnpx nx preview auroria
  pnpx nx preview borealis
  pnpx nx preview cygnus
  ```

- **Serving My Host App**  
  I run the host app in a separate terminal.  
  ```bash
  pnpx nx preview shell
  ```

- **Verifying My Functionality**  
  I open `http://localhost:3000` in a browser to confirm the shell loads remote components and HMR works.

---

## My Architecture Highlights

- **Monorepo Structure**  
  I organize the project with Nx: `apps/` for applications, `libs/` for shared plugins and utilities.

- **Applications**  
  - **Remotes**: I configure `auroria`, `borealis`, and `cygnus` (React + Vite) to expose components (`AuroriaMap`, `BorealisChart`, `CygnusDashboard`).  
  - **Host**: I set up `shell` (React + Vite) to dynamically load remote components.

- **Build Tool**  
  I use Vite for all apps to ensure fast builds and HMR.

- **Module Federation**  
  I enable micro-frontend integration with `vite-plugin-module-federation`.

- **Custom Nx Plugin**  
  My `libs/nx-mf-vite` includes a `setup-vite-mf` generator to automate Module Federation configuration.

- **Shared Singletons**  
  I share `react`, `react-dom`, and optionally `styled-components` across apps to ensure consistency and avoid version conflicts.

- **Lazy Loading**  
  In my `shell` app, I use `React.lazy` and `React.Suspense` for efficient remote component loading.