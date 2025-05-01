# ViteOfTheThreeKingdoms

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ This Nx workspace unites React city-states under a single Micro-Frontend (MF) architecture powered by Vite. ✨

## Mission

The federation of Auroria, Borealis, and Cygnus needs faster trade routes! This project unites these React city-states using Module Federation with Vite, managed within an Nx workspace potentially utilizing a custom Nx plugin.

## Getting Started

### Prerequisites

Ensure you have Node.js and pnpm installed.

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```sh
    pnpm install
    ```

### Running the Applications

**1. Build Remote Applications (Auroria, Borealis, Cygnus)**

To build all remote applications for production:

```sh
pnpm run build:remotes
```

Or build a specific remote application:

```sh
npx nx build auroria
npx nx build borealis
npx nx build cygnus
```

**2. Preview Remote Applications**

To preview all remote applications concurrently (useful for development):

```sh
pnpm run preview:remotes
```

This will typically start them on different ports (e.g., 3001, 3002, 3003).

To preview a specific remote application:

```sh
# Example for Auroria (usually runs on port 3001)
npx nx preview auroria

# Example for Borealis (usually runs on port 3002)
npx nx preview borealis

# Example for Cygnus (usually runs on port 3003)
npx nx preview cygnus
```

**3. Serve the Host Application (Shell)**

To run the main host application which integrates the remotes:

```sh
npx nx serve shell
```

This will typically start the shell application, which dynamically loads the remote micro-frontends.

## Exploring the Workspace

Run `npx nx graph` to see a diagram of the dependencies between the applications and libraries.

## Nx Help

Refer to the official [Nx documentation](https://nx.dev) for more information on Nx commands and capabilities. You can see available commands for a specific project like this:

```sh
npx nx show project shell --web
npx nx show project auroria --web
```

## Useful links

Learn more:

- [Learn more about Nx workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
