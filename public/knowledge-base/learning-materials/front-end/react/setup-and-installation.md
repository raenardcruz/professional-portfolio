# React Setup & Installation

React is a popular, open-source JavaScript library developed by Meta (formerly Facebook) for building user interfaces, particularly single-page applications. It is component-based, declarative, and uses a Virtual DOM to optimize rendering performance.

In modern web development, scaffolding React apps using **Vite** has become the industry standard, replacing the legacy Create React App (CRA) due to Vite's superior build speeds and development server performance.

---

## 1. Prerequisites

Before setting up a React application, ensure you have the following installed on your system:

### Node.js & Package Manager
React development requires Node.js (which includes `npm`). We recommend installing the active Long-Term Support (LTS) version.

- **Download**: Visit the [Official Node.js website](https://nodejs.org/) to download the installer for your OS.
- **Verification**: Run these commands in your terminal to verify installation:
  ```bash
  node --version
  npm --version
  ```

> [!TIP]
> Consider using a Node Version Manager like **nvm** (macOS/Linux) or **nvm-windows** to easily switch between Node.js versions across different projects.

---

## 2. Scaffolding a React Project with Vite

To create a new React application with Vite, you can choose between an interactive prompt or a direct template command. Select the toolchain that fits your workflow:

### Option A: Interactive Command Line
Run the interactive initializer in your terminal. You will be prompted for a project name, framework (select **React**), and variant (select **JavaScript** or **TypeScript**):

```bash
# Using npm
npm create vite@latest

# Using yarn
yarn create vite

# Using pnpm
pnpm create vite

# Using bun
bun create vite
```

### Option B: Quick Scaffolding with Templates
Directly create a React project in one command by providing a project name and a pre-configured template:

**For JavaScript:**
```bash
# npm
npm create vite@latest my-react-app -- --template react

# yarn
yarn create vite my-react-app --template react

# pnpm
pnpm create vite my-react-app --template react

# bun
bun create vite my-react-app --template react
```

**For TypeScript:**
```bash
# npm
npm create vite@latest my-react-app -- --template react-ts

# yarn
yarn create vite my-react-app --template react-ts

# pnpm
pnpm create vite my-react-app --template react-ts

# bun
bun create vite my-react-app --template react-ts
```

---

## 3. Installation & Getting Started

Navigate to the project directory, install dependencies, and launch the development server:

### Step 1: Navigate to the directory
```bash
cd my-react-app
```

### Step 2: Install dependencies
```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install

# Using bun
bun install
```

### Step 3: Start the local development server
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun run dev
```

The console will display the local URL (typically `http://localhost:5173`). Open this URL in your browser to view the running React app powered by Vite.

---

## 4. Project Configuration

Vite uses a configuration file named `vite.config.js` in the root of your project. A standard configuration for a React app looks like this:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Customize port
    open: true  // Open browser automatically on start
  }
})
```

---

## 5. Standard Directory Structure

A recommended directory layout for a scalable React application:

```text
my-react-app/
├── public/              # Static assets (favicons, robots.txt)
├── src/
│   ├── assets/          # Images, fonts, and global stylesheets
│   ├── components/      # Reusable UI components (Button, Input, Card)
│   ├── context/         # React Context files for state management
│   ├── hooks/           # Custom React hooks (useAuth, useFetch)
│   ├── layouts/         # Layout components (MainLayout, AuthLayout)
│   ├── services/        # API service clients and helper modules
│   ├── views/           # Page-level views/routes (Home, Dashboard)
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Application entry point (renders App.jsx)
│   └── index.css        # Global CSS rules
├── index.html           # Main HTML shell
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration
```

---

## 6. Understanding the Entry Points

### index.html
Unlike legacy setups, Vite treats `index.html` as the entry point of the application. It contains a root division and links directly to the JavaScript entry point:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### src/main.jsx
This file uses React 18's `createRoot` API to mount the application root into the DOM container:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 7. Recommended Development Tools

To enhance your React development experience, we recommend installing the following tools:

### VS Code Extensions
- **ES7+ React/Redux/React-Native Snippets**: Provides handy keyboard shortcuts for writing React boilerplate (e.g. typing `rfc` generates a functional component).
- **ESLint**: Lints code for syntax and style issues.
- **Prettier**: Code formatter for consistent code styling.

### Browser Extensions
- **React Developer Tools**: Available for Chrome, Firefox, and Edge. It adds a "Components" tab to your browser inspector to inspect React component hierarchies, state, and props, as well as a "Profiler" tab to measure performance.
