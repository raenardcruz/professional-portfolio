# Best Practice Scalable Folder Structure for React

> [!NOTE]
> This guide outlines a premium, scalable folder structure for React projects, suitable for large applications.

## Overview
A clean, modular layout improves maintainability and developer experience. Recommended structure:



## Detailed Explanation
- **assets/**: Store images, icons, fonts. Use Vite/Webpack loaders.
- **components/**: UI building blocks, follow atomic‑design.
- **hooks/**: Reusable logic via custom hooks; keep them pure.
- **pages/**: Top‑level page components that assemble components and hooks.
- **routes/**: Centralize route config; enable lazy loading with .
- **store/**: Organize Redux slices or other store modules; keep actions close to reducers.
- **styles/**: Use CSS Modules or styled‑components; define theme variables.
- **utils/**: Helper functions (formatting, API clients).

## Benefits
- **Scalability**: Clear boundaries let teams work independently.
- **Maintainability**: Easy to locate and refactor code.
- **Performance**: Lazy‑load routes and components to reduce bundle size.

> [!TIP]
> Use Vite for rapid development and configure path alias  to .

---
*Generated with the create‑guide skill.*