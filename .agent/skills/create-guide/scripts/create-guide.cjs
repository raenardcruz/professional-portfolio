#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple CLI arguments parser
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const val = args[i + 1];
            if (val && !val.startsWith('--')) {
                options[key] = val;
                i++;
            } else {
                options[key] = true;
            }
        }
    }
    return options;
}

function toKebabCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function main() {
    const options = parseArgs();

    // Check for help
    if (options.help || Object.keys(options).length === 0) {
        console.log(`
Usage:
  node create-guide.cjs --title <title> --category <category> --filename <filename> [--content <markdown>]

Options:
  --title     The display name of the guide in the navigation tree.
  --category  The category folder name (e.g. "Go Learnings", "System Design").
  --filename  The markdown filename (e.g. "intro.md").
  --content   The markdown body content of the guide. If omitted, a template is created.
        `);
        process.exit(0);
    }

    // Validation
    const title = options.title;
    const category = options.category;
    let filename = options.filename;

    if (!title || !category || !filename) {
        console.error('Error: --title, --category, and --filename are required.');
        process.exit(1);
    }

    // Ensure filename ends with .md
    if (!filename.endsWith('.md')) {
        filename += '.md';
    }

    const categoryFolder = toKebabCase(category);
    const relativeDocPath = `${categoryFolder}/${filename}`;

    const projectRoot = process.cwd();
    const docsRoot = path.join(projectRoot, 'public/knowledge-base');
    const destFolder = path.join(docsRoot, categoryFolder);
    const destFile = path.join(destFolder, filename);
    const structureFile = path.join(docsRoot, 'structure.json');

    console.log(`\nCreating guide: "${title}"`);
    console.log(`Category:       "${category}" (folder: ${categoryFolder})`);
    console.log(`Path:           public/knowledge-base/${relativeDocPath}`);

    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder, { recursive: true });
        console.log(`Created directory: public/knowledge-base/${categoryFolder}`);
    }

    // 2. Draft content
    let content = options.content;
    if (!content) {
        content = `# ${title}\n\nThis is a newly created guide on **${title}** under the **${category}** category.\n\n## Introduction\n\nProvide an introduction to the topic here.\n\n## Content Section\n\nAdd content details.\n`;
    } else {
        // Ensure content starts with single # title if not present
        if (!content.trim().startsWith('#')) {
            content = `# ${title}\n\n${content}`;
        }
    }

    // 3. Write markdown file
    fs.writeFileSync(destFile, content, 'utf8');
    console.log(`Successfully wrote markdown file: public/knowledge-base/${relativeDocPath}`);

    // 4. Update structure.json
    let structure = [];
    if (fs.existsSync(structureFile)) {
        try {
            const raw = fs.readFileSync(structureFile, 'utf8');
            structure = JSON.parse(raw);
        } catch (e) {
            console.error('Error reading/parsing structure.json. Starting fresh.', e);
            structure = [];
        }
    }

    // Find if category already exists in structure
    let categoryNode = structure.find(
        node => node.type === 'folder' && node.name.toLowerCase() === category.toLowerCase()
    );

    if (!categoryNode) {
        // Create new category node
        categoryNode = {
            name: category,
            type: 'folder',
            children: []
        };
        structure.push(categoryNode);
        console.log(`Created new category in structure.json: "${category}"`);
    }

    // Check if the file is already registered in children
    let fileNode = categoryNode.children.find(
        child => child.type === 'file' && child.path === relativeDocPath
    );

    if (!fileNode) {
        categoryNode.children.push({
            name: title,
            type: 'file',
            path: relativeDocPath
        });
        console.log(`Registered guide in structure.json under "${category}"`);
    } else {
        // Update the title if it changed
        fileNode.name = title;
        console.log(`Updated guide name to "${title}" in structure.json`);
    }

    // Save structure.json
    fs.writeFileSync(structureFile, JSON.stringify(structure, null, 2), 'utf8');
    console.log('Successfully updated public/knowledge-base/structure.json\n');
}

main();
