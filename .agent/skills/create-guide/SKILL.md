---
name: create-guide
description: Automatically create a new markdown guide, place it in the appropriate folder under public/knowledge-base, and update the structure.json index. Use this skill when asked to create a guide, article, tutorial, or register documentation.
---

# Create Guide Skill

This skill allows agents to automatically generate technical guides, tutorials, and documentations in the portfolio workspace. It automates:
1. Creating category directories under `public/knowledge-base/` if they do not exist.
2. Generating a clean, structured Markdown file.
3. Updating `public/knowledge-base/structure.json` to register the new file under the correct folder hierarchy so that it dynamically loads in the sidebar.

## Guide Writing Guidelines

When writing technical guides, ensure they feel premium, professional, and easy to follow:
1. **Structural Hierarchy**: Start with a single `# [Title]` header. Use `##` and `###` for sub-headers. Do not repeat the main title header.
2. **Visual Breaks**: Use standard Markdown tables for comparisons and blockquotes/alerts for key callouts.
3. **KnowledgeBase.vue Features**:
   - **Alerts**: Use GitHub-style syntax within blockquotes:
     - `> [!NOTE]` (Information, background context)
     - `> [!TIP]` (Best practices, optimization tips)
     - `> [!IMPORTANT]` (Crucial guidelines or requirements)
     - `> [!WARNING]` (Deprecations, potential pitfalls)
     - `> [!CAUTION]` (High-risk operations)
   - **Code Blocks**: Use standard fenced code blocks with language identifiers. Pre-blocks automatically receive copy-to-clipboard buttons in the UI.
   - **Images**: Use absolute or relative paths. Markdown images are rendered with custom containers and captions.
4. **Research and Clarity**: Break down complex system topics into step-by-step processes. Use clear terminology, bulleted lists, and diagrams.

## How to Use the Automation Script

The skill includes a Node.js CLI script that automates directory resolution, markdown generation, and JSON registration.

### Command Execution

```bash
node .agent/skills/create-guide/scripts/create-guide.cjs \
  --title "Guide Title" \
  --category "Category Name" \
  --filename "guide-filename.md" \
  --content "Markdown content body..."
```

### Options

- `--title` (Required): The display name of the guide as it will appear in the navigation sidebar (e.g. `"Introduction to WebGPU"`).
- `--category` (Required): The category/folder display name. If the category does not exist, the script creates it (e.g. `"Web Graphics"`).
- `--filename` (Required): The name of the markdown file (e.g. `"webgpu-intro.md"`). The script will save it at `public/knowledge-base/<category-folder>/<filename>`.
- `--content` (Optional): The markdown content. If omitted, a structured template will be generated.

### Manual Steps (Fall-back)

If the script cannot be run:
1. Determine the folder name by converting the category to kebab-case (e.g., `"Web Graphics"` -> `web-graphics`).
2. Create `public/knowledge-base/<category-kebab-case>/<filename>`.
3. Open `public/knowledge-base/structure.json` and append the new document node under the corresponding category folder. If the category folder is new, add a new folder block:
   ```json
   {
     "name": "Category Name",
     "type": "folder",
     "children": [
       {
         "name": "Guide Title",
         "type": "file",
         "path": "category-kebab-case/filename.md"
       }
     ]
   }
   ```
