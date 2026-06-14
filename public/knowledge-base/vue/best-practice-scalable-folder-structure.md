# Best Practice Scalable Folder Structure for Vue.js

> [!NOTE]
> This guide outlines a premium, scalable folder structure for Vue.js projects, suitable for large applications.

## Overview
A well‑organized project enhances maintainability, testability, and developer experience. Below is a recommended structure:



## Detailed Explanation
- **assets/**: Keep images, icons, fonts. Use webpack/Vite loaders.
- **components/**: Atomic UI components (buttons, cards). Follow atomic‑design principles.
- **composables/**: Encapsulate reusable logic using Vue 3's Composition API.
- **router/**: Centralize route definitions; lazy‑load routes for performance.
- **store/**: Organize state modules; keep actions/mutations close to related components.
- **views/**: Top‑level pages composed of components and composables.
- **styles/**: Use SCSS with variables for colors, spacing, breakpoints. Consider CSS‑Modules for scoped styles.
- **utils/**: Helper functions (formatting, API wrappers).

## Benefits
- **Scalability**: Clear separation enables teams to work concurrently.
- **Maintainability**: Easier to locate files and enforce conventions.
- **Performance**: Lazy loading at router level improves initial load.

> [!TIP]
> Use Vite for fast HMR and configure alias  to point to .

---
*Generated with the create‑guide skill.*