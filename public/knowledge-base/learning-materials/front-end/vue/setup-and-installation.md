# Vue Setup & Installation

Vue.js is a progressive JavaScript framework used for building user interfaces. Unlike monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, making it easy to pick up and integrate with other libraries or existing projects.

In Vue 3, the recommended syntax is the **Composition API** combined with `<script setup>`, which provides a cleaner, more concise, and performant developer experience compared to the legacy Options API.

---

## 1. Prerequisites

Before setting up a Vue application, ensure you have the following installed on your system:

### Node.js & Package Manager
Vue development requires Node.js (which includes `npm`). We recommend installing the active Long-Term Support (LTS) version.

- **Download**: Visit the [Official Node.js website](https://nodejs.org/) to download the installer for your OS.
- **Verification**: Run these commands in your terminal to verify installation:
  ```bash
  node --version
  npm --version
  ```

---

## 2. Scaffolding a Vue Project with Vite

To create a new Vue 3 application, you can use Vite's standard scaffolding tool (`npm create vite@latest`) or the official Vue onboarding tool (`npm create vue@latest`), which is also powered by Vite under the hood.

### Option A: Standard Vite Scaffolding
This is the fastest, minimal way to get a clean Vue setup. Run the command and select **Vue**, then choose either **JavaScript** or **TypeScript**:

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

#### Quick Scaffolding with Templates
Directly create a Vue project with a template flag:

**For JavaScript:**
```bash
# npm
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue

# bun
bun create vite my-vue-app --template vue
```

**For TypeScript:**
```bash
# npm
npm create vite@latest my-vue-app -- --template vue-ts

# yarn
yarn create vite my-vue-app --template vue-ts

# pnpm
pnpm create vite my-vue-app --template vue-ts

# bun
bun create vite my-vue-app --template vue-ts
```

### Option B: Official Vue onboarding (create-vue)
If you need additional pre-configured libraries (such as Vue Router for routing, Pinia for state management, or testing suites), use the official `create-vue` initialization tool:

```bash
npm create vue@latest
```

The script will prompt you with several optional configurations. For a standard modern setup, we recommend:
```text
✔ Project name: … my-vue-app
✔ Add TypeScript? … No / Yes (depending on preference)
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … Yes
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End (E2E) Testing Solution? … No
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … Yes
```

---

## 3. Installation & Getting Started

Navigate to the project directory, install dependencies, and launch the Vite development server:

### Step 1: Navigate to the directory
```bash
cd my-vue-app
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

The console will display the local URL (typically `http://localhost:5173`). Open this URL in your browser to view the running Vue app.

---

## 4. Project Configuration

Vue projects scaffolded with Vite use a configuration file named `vite.config.js` (or `vite.config.ts`).

### Basic Vite Vue Configuration
If scaffolded using Option A, your configuration is minimal:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

### Configured Vue Setup (create-vue)
If scaffolded using Option B, your configuration will include build alias resolution and other options:

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Official Vue SFC compiler plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Custom alias for easy src imports
    }
  }
})
```

---

## 5. Standard Directory Structure

A recommended directory layout for a Vue 3 project:

```text
my-vue-app/
├── public/              # Static assets (favicons, manifest.json)
├── src/
│   ├── assets/          # Images, fonts, global CSS
│   ├── components/      # Reusable Single File Components (SFCs)
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia state stores
│   ├── views/           # Page components representing routes
│   ├── App.vue          # Root component
│   └── main.js          # App entry point (registers plugins and mounts App)
├── index.html           # Main HTML shell
├── package.json         # Project metadata and scripts
└── vite.config.js       # Vite configuration
```

---

## 6. Understanding Vue Single File Components (SFCs)

Vue components are typically written in `.vue` files, which combine template markup, script logic, and style declarations into a single file. Here is an example of a modern Vue 3 component using `<script setup>` and CSS scoping:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>

<template>
  <div class="counter-card">
    <p>Current Count: {{ count }}</p>
    <button @click="increment">Click Me</button>
  </div>
</template>

<style scoped>
.counter-card {
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  background: #42b883; /* Vue brand green */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

> [!NOTE]
> The `scoped` attribute on the `<style>` block ensures that the styles defined here only apply to this component, preventing layout leaks to other pages.

---

## 7. Recommended Development Tools

To ensure a smooth coding workflow:

### VS Code Extensions
- **Vue - Official (formerly Volar)**: The essential extension for Vue 3. It provides syntax highlighting, type checking, auto-completion, and formatting for `.vue` files.
- **ESLint** & **Prettier**: Critical extensions to format and lint your code automatically.

> [!IMPORTANT]
> If you previously installed **Vetur** (the legacy extension for Vue 2), disable it in your Vue 3 projects to avoid conflicts with Vue - Official (Volar).

### Browser Extensions
- **Vue Devtools**: Available for Chrome, Firefox, and Safari. Excellent tool for debugging component data, state stores, router paths, and event triggers directly in the browser's developer tools.

