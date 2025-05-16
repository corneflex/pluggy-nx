# pluggy-nx

This repository illustrates the concepts from the article:  
[Bootstrap a plugin architecture in React with Webpack Module Federation and Nx](https://medium.com/@CorneflexSteve/bootstrap-a-plugin-architecture-in-react-with-webpack-module-federation-and-nx-a6f3d9727f7e)

## Overview

This project demonstrates how to build a **plugin architecture** in React using:
- **Webpack Module Federation** for dynamic plugin loading
- **Nx** for monorepo management and modular development

**Goal:**  
Enable you to extend a React app with plugins, without modifying or rebuilding the host.

---

## Key Concepts

- **Host (Core):** The main app, responsible for loading and managing plugins.
- **Plugin (Remote):** A feature module, loaded dynamically at runtime.
- **Module Federation:** Webpack 5 feature allowing runtime code sharing between apps.

---

## Repo Structure

- `apps/host/pluggy` — The main host application
- `apps/plugins/plugme` — Example plugin (remote)
- `libs/core` — Shared library (utilities, types, dynamic loader, etc.)

---

## Quick Start

```bash
yarn install
yarn start
# or, with Nx:
nx serve host-pluggy
nx serve plugins-plugme
```
Open [http://localhost:4200](http://localhost:4200) for the host.  
The plugin is accessible via the menu.

---

## How It Works

### 1. Static Module Federation

The host declares remotes in `module-federation.config.js`:

```js
// apps/host/pluggy/module-federation.config.js
const moduleFederationConfig = {
  name: 'host-pluggy',
  remotes: ['plugins-plugme'],
};
module.exports = moduleFederationConfig;
```

The plugin exposes its entry point:

```js
// apps/plugins/plugme/module-federation.config.js
const moduleFederationConfig = {
  name: 'plugins-plugme',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
module.exports = moduleFederationConfig;
```

The host loads the plugin with React.lazy:

```tsx
const PluginsPlugme = React.lazy(() => import('plugins-plugme/Module'));
```

---

### 2. Dynamic Plugin Loading (Advanced)

To make plugin loading fully dynamic (no rebuild required), use a dynamic loader:

**Example dynamic loader (from `libs/core/src/lib/dynamic-module.ts`):**

```ts
export const useFederatedComponent = (remoteUrl, scope, module) => {
  // ...dynamic import logic using Webpack's APIs
};
```

**Usage in the host:**

```tsx
<DynamicComponent
  url="http://localhost:4201/remoteEntry.js"
  scope="plugme"
  module="./Module"
/>
```

This allows you to register new plugins at runtime, without changing the host's code.

---

## Going Further

- **Plugin registry/server:** You can add a backend (e.g., NestJS) to host, register, and publish plugins.
- **Production:** Plugins can be deployed independently (e.g., on cloud storage) and loaded by the host at runtime.

---

## References

- [Medium article: Bootstrap a plugin architecture in React with Webpack Module Federation and Nx](https://medium.com/@CorneflexSteve/bootstrap-a-plugin-architecture-in-react-with-webpack-module-federation-and-nx-a6f3d9727f7e)
- [Webpack Module Federation docs](https://webpack.js.org/concepts/module-federation/)
- [Nx documentation](https://nx.dev/)

---

**Want to add your own plugin?**  
Just scaffold a new remote app with Nx, expose a module, and register it in the host (or load it dynamically)! 