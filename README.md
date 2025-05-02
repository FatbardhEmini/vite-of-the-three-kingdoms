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

**3. Preview the Host Application (Shell)**

To run the main host application which integrates the remotes (make sure remotes are built and preferably previewed):

```sh
npx nx preview shell
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

