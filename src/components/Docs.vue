<template>
    <div class="docs-container">
        <Header />

        <div class="docs-layout">
            <!-- Sidebar Navigation -->
            <aside class="docs-sidebar" :class="{ 'mobile-open': mobileSidebarOpen }">
                <div class="sidebar-search">
                    <i class="pi pi-search search-icon"></i>
                    <input 
                        type="text" 
                        v-model="searchQuery" 
                        placeholder="Search docs..." 
                        class="search-input"
                    />
                    <i 
                        v-if="searchQuery" 
                        class="pi pi-times clear-icon" 
                        @click="searchQuery = ''"
                    ></i>
                </div>

                <div class="sidebar-tree">
                    <div 
                        v-for="item in visibleItems" 
                        :key="item.name + '-' + item.type + '-' + item.depth"
                        class="tree-node"
                        :class="{ 
                            'node-file': item.type === 'file', 
                            'node-folder': item.type === 'folder',
                            'node-active': activeFile === item.path
                        }"
                        :style="{ paddingLeft: (item.depth * 1.25 + 0.75) + 'rem' }"
                        @click="handleNodeClick(item)"
                    >
                        <!-- Directory Chevron -->
                        <span v-if="item.type === 'folder'" class="node-arrow">
                            <i :class="expandedFolders[item.name] ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
                        </span>
                        
                        <!-- Item Icon -->
                        <span class="node-icon">
                            <i :class="getNodeIcon(item)"></i>
                        </span>

                        <!-- Item Name -->
                        <span class="node-name">{{ item.name }}</span>
                    </div>

                    <div v-if="visibleItems.length === 0" class="no-results">
                        <i class="pi pi-inbox"></i>
                        <p>No documents found</p>
                    </div>
                </div>
            </aside>

            <!-- Mobile Sidebar Overlay Backdrop -->
            <div 
                v-if="mobileSidebarOpen" 
                class="sidebar-backdrop" 
                @click="mobileSidebarOpen = false"
            ></div>

            <!-- Mobile Floating Toggle Button -->
            <button 
                class="mobile-sidebar-toggle" 
                @click="mobileSidebarOpen = !mobileSidebarOpen"
                aria-label="Toggle Sidebar"
            >
                <i :class="mobileSidebarOpen ? 'pi pi-times' : 'pi pi-list'"></i>
            </button>

            <!-- Main Content Area -->
            <main class="docs-main" id="docs-content-viewport">
                <!-- Breadcrumbs -->
                <div class="breadcrumbs" v-if="activeFile">
                    <span v-for="(crumb, index) in breadcrumbs" :key="index" class="crumb-item">
                        <span v-if="index > 0" class="crumb-separator">/</span>
                        <span 
                            class="crumb-text" 
                            :class="{ 'crumb-clickable': index === 0 || index === 1 }"
                            @click="handleCrumbClick(index)"
                        >
                            {{ crumb }}
                        </span>
                    </span>
                </div>

                <div class="docs-content">
                    <!-- Loading State -->
                    <div v-if="loading" class="docs-loading">
                        <i class="pi pi-spin pi-spinner loading-spinner"></i>
                        <p>Loading document...</p>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="docs-error-card">
                        <i class="pi pi-exclamation-triangle error-icon"></i>
                        <h3>Error Loading Document</h3>
                        <p>{{ error }}</p>
                        <button class="retry-btn" @click="retryLoad">
                            <i class="pi pi-refresh"></i> Retry
                        </button>
                    </div>

                    <!-- Article Render -->
                    <article 
                        v-else-if="activeFile" 
                        class="markdown-body" 
                        v-html="docContent"
                    ></article>

                    <!-- Landing Dashboard (Default view when no file selected) -->
                    <div v-else class="docs-landing">
                        <div class="landing-header animate-fade-in">
                            <div class="landing-badge">Portfolio Docs</div>
                            <h1>Knowledge Base & <span class="accent">Showcase</span></h1>
                            <p class="landing-subtitle">Explore my technical documentations, code learnings, and project system designs.</p>
                        </div>

                        <!-- Search Box for Landing -->
                        <div class="landing-search animate-fade-in">
                            <div class="search-wrapper">
                                <i class="pi pi-search search-icon-large"></i>
                                <input 
                                    type="text" 
                                    v-model="searchQuery" 
                                    placeholder="Search topics, projects, or languages..." 
                                    class="search-input-large"
                                    @focus="focusSidebarSearch"
                                />
                            </div>
                        </div>

                        <!-- Root Categories Grid -->
                        <div class="categories-grid animate-fade-in">
                            <div 
                                v-for="category in structure" 
                                :key="category.name"
                                class="category-card"
                                @click="openCategory(category)"
                            >
                                <div class="category-icon-box">
                                    <i :class="getCategoryIcon(category.name)"></i>
                                </div>
                                <h3>{{ category.name }}</h3>
                                <p v-if="category.children">
                                    {{ category.children.length }} document{{ category.children.length !== 1 ? 's' : '' }} inside
                                </p>
                                <div class="card-action">
                                    <span>Browse Category</span>
                                    <i class="pi pi-arrow-right"></i>
                                </div>
                            </div>
                        </div>

                        <!-- How to Add Docs Tip -->
                        <div class="docs-tip-card animate-fade-in">
                            <div class="tip-icon">
                                <i class="pi pi-lightbulb"></i>
                            </div>
                            <div class="tip-content">
                                <h4>Pro Tip: How to expand this portfolio</h4>
                                <p>To add more files to this section, just drop a <code>.md</code> file in the <code>public/docs/</code> directory and register it in <code>public/docs/structure.json</code>. The navigation tree and search indices will update automatically!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Header from './reusable/Header.vue'
import Footer from './reusable/Footer.vue'
import { marked } from 'marked'

const structure = ref([])
const expandedFolders = ref({})
const searchQuery = ref('')
const activeFile = ref('')
const docContent = ref('')
const loading = ref(false)
const error = ref(null)
const mobileSidebarOpen = ref(false)

// Configure custom marked renderer
const renderer = new marked.Renderer()

// Custom image path resolver & styling
renderer.image = function(arg1, arg2, arg3) {
    let href, title, text
    if (typeof arg1 === 'object' && arg1 !== null) {
        href = arg1.href
        title = arg1.title
        text = arg1.text
    } else {
        href = arg1
        title = arg2
        text = arg3
    }
    
    // Resolve relative path against active file directory
    let resolvedHref = href || ''
    if (href && !href.startsWith('http') && !href.startsWith('/')) {
        const lastSlash = activeFile.value.lastIndexOf('/')
        const dir = lastSlash !== -1 ? activeFile.value.substring(0, lastSlash + 1) : ''
        resolvedHref = `/docs/${dir}${href}`
    }
    
    return `
        <div class="md-image-container">
            <img src="${resolvedHref}" alt="${text || ''}" title="${title || ''}" class="md-image" />
            ${text ? `<span class="md-image-caption">${text}</span>` : ''}
        </div>
    `
}

// Custom blockquote style to support alerts: > [!NOTE]
renderer.blockquote = function(arg) {
    let quote = ''
    if (typeof arg === 'object' && arg !== null) {
        quote = arg.text || ''
    } else {
        quote = arg || ''
    }
    
    const alerts = [
        { key: '[!NOTE]', class: 'alert-note', icon: 'pi pi-info-circle', title: 'Note' },
        { key: '[!TIP]', class: 'alert-tip', icon: 'pi pi-lightbulb', title: 'Tip' },
        { key: '[!IMPORTANT]', class: 'alert-important', icon: 'pi pi-exclamation-circle', title: 'Important' },
        { key: '[!WARNING]', class: 'alert-warning', icon: 'pi pi-exclamation-triangle', title: 'Warning' },
        { key: '[!CAUTION]', class: 'alert-caution', icon: 'pi pi-shield', title: 'Caution' }
    ]
    
    for (const alert of alerts) {
        if (quote.includes(alert.key)) {
            const cleanQuote = quote.replace(alert.key, '').trim()
            return `
                <div class="md-alert ${alert.class}">
                    <div class="md-alert-header">
                        <i class="${alert.icon} md-alert-icon"></i>
                        <span class="md-alert-title">${alert.title}</span>
                    </div>
                    <div class="md-alert-content">${cleanQuote}</div>
                </div>
            `
        }
    }
    
    return `<blockquote class="md-blockquote">${quote}</blockquote>`
}

marked.setOptions({ renderer })

// Fetch the tree structure on mount
const fetchStructure = async () => {
    try {
        const res = await fetch('/docs/structure.json')
        if (!res.ok) throw new Error('Could not fetch documentation structure')
        structure.value = await res.json()
        
        // Expand folders by default
        structure.value.forEach(item => {
            if (item.type === 'folder') {
                expandedFolders.value[item.name] = true
            }
        })
    } catch (err) {
        console.error(err)
        error.value = 'Failed to load document directory structure.'
    }
}

// Flatten tree based on collapse states and search queries
const visibleItems = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    const items = []
    
    if (!query) {
        // Recursive helper to traverse hierarchy based on expandedFolders
        const traverse = (nodes, depth = 0) => {
            nodes.forEach(node => {
                items.push({
                    name: node.name,
                    type: node.type,
                    path: node.path,
                    depth,
                    node
                })
                
                if (node.type === 'folder' && expandedFolders.value[node.name]) {
                    if (node.children) {
                        traverse(node.children, depth + 1)
                    }
                }
            })
        }
        traverse(structure.value, 0)
    } else {
        // Search filter helper: check if node matches or has matching children
        const nodeMatches = (node) => {
            if (node.name.toLowerCase().includes(query)) return true
            if (node.children) {
                return node.children.some(child => nodeMatches(child))
            }
            return false
        }
        
        const traverseSearch = (nodes, depth = 0) => {
            nodes.forEach(node => {
                if (nodeMatches(node)) {
                    items.push({
                        name: node.name,
                        type: node.type,
                        path: node.path,
                        depth,
                        node
                    })
                    
                    if (node.type === 'folder') {
                        // Force expand folders during search so matching children are visible
                        expandedFolders.value[node.name] = true
                        if (node.children) {
                            traverseSearch(node.children, depth + 1)
                        }
                    }
                }
            })
        }
        traverseSearch(structure.value, 0)
    }
    
    return items
})

// Get icons based on folder/file type and names
const getNodeIcon = (item) => {
    if (item.type === 'folder') {
        return expandedFolders.value[item.name] ? 'pi pi-folder-open' : 'pi pi-folder'
    }
    // File icons based on suffix
    const path = item.path.toLowerCase()
    if (path.includes('go/')) return 'pi pi-code'
    if (path.includes('system-design/')) return 'pi pi-server'
    if (path.includes('projects/')) return 'pi pi-briefcase'
    return 'pi pi-file'
}

const getCategoryIcon = (name) => {
    const n = name.toLowerCase()
    if (n.includes('go')) return 'pi pi-code'
    if (n.includes('system design') || n.includes('architecture')) return 'pi pi-server'
    if (n.includes('project')) return 'pi pi-briefcase'
    return 'pi pi-folder'
}

// Handle sidebar item clicking
const handleNodeClick = (item) => {
    if (item.type === 'folder') {
        expandedFolders.value[item.name] = !expandedFolders.value[item.name]
    } else {
        activeFile.value = item.path
        window.location.hash = `#docs/${item.path}`
        mobileSidebarOpen.value = false // close on mobile select
    }
}

// Open Category from Landing Cards
const openCategory = (category) => {
    expandedFolders.value[category.name] = true
    
    const findFirstFile = (node) => {
        if (node.type === 'file') return node
        if (node.type === 'folder' && node.children) {
            expandedFolders.value[node.name] = true
            for (const child of node.children) {
                const found = findFirstFile(child)
                if (found) return found
            }
        }
        return null
    }
    
    if (category.children && category.children.length > 0) {
        for (const child of category.children) {
            const firstFile = findFirstFile(child)
            if (firstFile) {
                handleNodeClick(firstFile)
                break
            }
        }
    }
}


// Breadcrumb calculations
const breadcrumbs = computed(() => {
    if (!activeFile.value) return ['Documentation']
    
    const findPath = (nodes, currentPath, parents = []) => {
        for (const node of nodes) {
            if (node.type === 'file' && node.path === currentPath) {
                return [...parents, node.name]
            }
            if (node.type === 'folder' && node.children) {
                const match = findPath(node.children, currentPath, [...parents, node.name])
                if (match) return match
            }
        }
        return null
    }
    
    const matched = findPath(structure.value, activeFile.value)
    if (matched) {
        return ['Docs', ...matched]
    }
    
    return ['Docs', activeFile.value]
})

const handleCrumbClick = (index) => {
    if (index === 0) {
        window.location.hash = '#'
    } else if (index === 1) {
        activeFile.value = ''
        window.location.hash = '#docs'
    }
}

// Focus the sidebar search box when clicking large landing search
const focusSidebarSearch = () => {
    const input = document.querySelector('.search-input')
    if (input) {
        input.focus()
    }
}

// Synchronization with URL Hash
const parseHash = () => {
    const hash = window.location.hash
    if (hash.startsWith('#docs/')) {
        activeFile.value = hash.substring(6)
    } else {
        activeFile.value = ''
    }
}

const retryLoad = () => {
    const file = activeFile.value
    activeFile.value = ''
    nextTick(() => {
        activeFile.value = file
    })
}

// Watch active file to load markdown content
watch(activeFile, async (newFile) => {
    if (!newFile) {
        docContent.value = ''
        return
    }
    loading.value = true
    error.value = null
    try {
        const res = await fetch(`/docs/${newFile}`)
        if (!res.ok) throw new Error(`Could not load /docs/${newFile} (${res.status} ${res.statusText})`)
        const mdText = await res.text()
        
        // Parse markdown to HTML
        docContent.value = await marked(mdText)
        
        // Set copy buttons
        nextTick(() => {
            const viewport = document.getElementById('docs-content-viewport')
            if (viewport) viewport.scrollTop = 0
            setupCopyButtons()
        })
    } catch (err) {
        console.error(err)
        error.value = err.message || 'Error loading document.'
    } finally {
        loading.value = false
    }
}, { immediate: true })

// Inject code copy buttons dynamically into HTML
const setupCopyButtons = () => {
    const preBlocks = document.querySelectorAll('.markdown-body pre')
    preBlocks.forEach(pre => {
        if (pre.querySelector('.copy-btn')) return
        
        pre.style.position = 'relative'
        
        const button = document.createElement('button')
        button.className = 'copy-btn'
        button.innerHTML = '<i class="pi pi-copy"></i>'
        button.setAttribute('aria-label', 'Copy code')
        
        const codeElement = pre.querySelector('code')
        const text = codeElement ? codeElement.innerText : pre.innerText
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(text)
                button.innerHTML = '<i class="pi pi-check" style="color: var(--secondary)"></i>'
                button.classList.add('copied')
                setTimeout(() => {
                    button.innerHTML = '<i class="pi pi-copy"></i>'
                    button.classList.remove('copied')
                }, 2000)
            } catch (err) {
                console.error(err)
            }
        })
        
        pre.appendChild(button)
    })
}

onMounted(() => {
    fetchStructure()
    parseHash()
    window.addEventListener('hashchange', parseHash)
})

onUnmounted(() => {
    window.removeEventListener('hashchange', parseHash)
})
</script>

<style>
/* Global-level styles for markdown element parsing (since v-html is used) */
.markdown-body {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--text-main);
}

.markdown-body h1 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--text-main);
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 0.75rem;
}

.markdown-body h2 {
    font-size: clamp(1.4rem, 3vw, 1.75rem);
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    color: var(--text-main);
    display: flex;
    align-items: center;
}

.markdown-body h2::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 1.25rem;
    background: var(--primary);
    border-radius: 4px;
    margin-right: 0.75rem;
    box-shadow: 0 0 8px var(--primary-glow);
}

.markdown-body h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text-main);
}

.markdown-body p {
    margin-bottom: 1.25rem;
    color: var(--text-muted);
}

.markdown-body hr {
    border: 0;
    height: 1px;
    background: var(--glass-border);
    margin: 2.5rem 0;
}

.markdown-body ul, .markdown-body ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    color: var(--text-muted);
}

.markdown-body li {
    margin-bottom: 0.5rem;
}

.markdown-body li::marker {
    color: var(--primary);
}

/* Code block styles */
.markdown-body pre {
    background: #0f1319;
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 1.25rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    margin-top: 1.25rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95rem;
}

.markdown-body code {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    border: 1px solid rgba(99, 102, 241, 0.15);
}

.markdown-body pre code {
    background: none;
    color: #cbd5e1;
    padding: 0;
    border-radius: 0;
    border: none;
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Copy Button */
.markdown-body .copy-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
}

.markdown-body .copy-btn:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: var(--primary);
    color: var(--text-main);
    transform: scale(1.05);
}

.markdown-body .copy-btn.copied {
    border-color: var(--secondary);
    background: rgba(6, 182, 212, 0.1);
}

/* Markdown Image Resolving */
.md-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2.5rem 0;
    width: 100%;
}

.md-image {
    max-width: 100%;
    max-height: 500px;
    border-radius: 16px;
    border: 1px solid var(--glass-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
}

.md-image:hover {
    transform: scale(1.01);
}

.md-image-caption {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 0.75rem;
    font-style: italic;
}

/* Tables */
.markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
    font-size: 0.95rem;
}

.markdown-body th {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
    font-weight: 600;
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid var(--glass-border);
}

.markdown-body td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--glass-border);
    color: var(--text-muted);
}

.markdown-body tr:hover td {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.01);
}

/* Alerts / Blockquotes */
.md-blockquote {
    border-left: 4px solid var(--primary);
    padding: 0.5rem 1.5rem;
    background: rgba(99, 102, 241, 0.03);
    margin: 1.5rem 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: var(--text-muted);
}

.md-alert {
    border-left: 4px solid #fff;
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
    border-radius: 0 16px 16px 0;
    background: rgba(255, 255, 255, 0.02);
}

.md-alert-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.md-alert-icon {
    font-size: 1rem;
}

.md-alert-title {
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.md-alert-content {
    font-size: 0.95rem;
    color: var(--text-muted);
}

.md-alert-content p {
    margin-bottom: 0;
}

/* Alert Color Customization */
.md-alert.alert-note {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.03);
}
.md-alert.alert-note .md-alert-icon,
.md-alert.alert-note .md-alert-title {
    color: var(--primary);
}

.md-alert.alert-tip {
    border-color: var(--secondary);
    background: rgba(6, 182, 212, 0.03);
}
.md-alert.alert-tip .md-alert-icon,
.md-alert.alert-tip .md-alert-title {
    color: var(--secondary);
}

.md-alert.alert-important {
    border-color: #8b5cf6; /* purple */
    background: rgba(139, 92, 246, 0.03);
}
.md-alert.alert-important .md-alert-icon,
.md-alert.alert-important .md-alert-title {
    color: #a78bfa;
}

.md-alert.alert-warning {
    border-color: #f59e0b; /* amber */
    background: rgba(245, 158, 11, 0.03);
}
.md-alert.alert-warning .md-alert-icon,
.md-alert.alert-warning .md-alert-title {
    color: #fbbf24;
}

.md-alert.alert-caution {
    border-color: var(--accent);
    background: rgba(244, 63, 148, 0.03);
}
.md-alert.alert-caution .md-alert-icon,
.md-alert.alert-caution .md-alert-title {
    color: var(--accent);
}
</style>

<style scoped>
.docs-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
}

.docs-layout {
    flex: 1;
    display: flex;
    margin-top: 70px; /* Header spacing */
    position: relative;
}

/* Sidebar Styles */
.docs-sidebar {
    width: 300px;
    background: rgba(10, 12, 18, 0.5);
    border-right: 1px solid var(--glass-border);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 70px;
    height: calc(100vh - 70px);
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-search {
    padding: 1.25rem;
    border-bottom: 1px solid var(--glass-border);
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 0.6rem 2.2rem 0.6rem 2.2rem;
    color: var(--text-main);
    font-size: 0.9rem;
    font-family: inherit;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.05);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
}

.search-icon {
    position: absolute;
    left: 2.25rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    pointer-events: none;
}

.clear-icon {
    position: absolute;
    right: 2.25rem;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.clear-icon:hover {
    color: var(--text-main);
}

.sidebar-tree {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

/* Scrollbar sidebar */
.sidebar-tree::-webkit-scrollbar {
    width: 6px;
}
.sidebar-tree::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.05);
}
.sidebar-tree::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
}

/* Tree Nodes */
.tree-node {
    display: flex;
    align-items: center;
    padding: 0.6rem 1rem;
    margin: 0.2rem 0.75rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.2s ease;
    user-select: none;
}

.tree-node:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
}

.node-active {
    background: rgba(99, 102, 241, 0.1) !important;
    color: var(--primary) !important;
    font-weight: 600;
}

.node-arrow {
    margin-right: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
}

.node-icon {
    margin-right: 0.75rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
}

.tree-node:hover .node-icon i,
.node-active .node-icon i {
    color: var(--primary);
}

.no-results {
    padding: 3rem 1.5rem;
    text-align: center;
    color: var(--text-muted);
}

.no-results i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
}

.no-results p {
    font-size: 0.9rem;
}

/* Main content pane */
.docs-main {
    flex: 1;
    overflow-y: auto;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 70%);
}

.breadcrumbs {
    max-width: 900px;
    width: 100%;
    margin: 1.5rem auto 0;
    padding: 0 2rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.crumb-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.crumb-separator {
    opacity: 0.5;
}

.crumb-text {
    transition: color 0.3s ease;
}

.crumb-clickable {
    cursor: pointer;
}

.crumb-clickable:hover {
    color: var(--primary);
}

.docs-content {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 2rem 4rem 2rem;
    flex: 1;
}

/* Loading & Error styling */
.docs-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    color: var(--text-muted);
}

.loading-spinner {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 1rem;
}

.docs-error-card {
    text-align: center;
    padding: 4rem 2rem;
    background: rgba(244, 63, 94, 0.02);
    border: 1px solid rgba(244, 63, 94, 0.1);
    border-radius: 20px;
    max-width: 500px;
    margin: 4rem auto;
}

.error-icon {
    font-size: 3rem;
    color: var(--accent);
    margin-bottom: 1rem;
}

.docs-error-card h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
}

.docs-error-card p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

.retry-btn {
    padding: 0.6rem 1.5rem;
    background: var(--primary);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.retry-btn:hover {
    background: #4f46e5;
    transform: translateY(-1px);
}

/* Mobile responsive sidebar */
.mobile-sidebar-toggle {
    display: none;
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    box-shadow: 0 4px 15px var(--primary-glow);
    cursor: pointer;
    z-index: 999;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.mobile-sidebar-toggle:hover {
    transform: scale(1.05);
}

.sidebar-backdrop {
    display: none;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 70px);
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 90;
}

/* Landing View Styles */
.docs-landing {
    padding: 2rem 0;
}

.landing-header {
    text-align: center;
    margin-bottom: 3rem;
}

.landing-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
}

.landing-header h1 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    margin-bottom: 1rem;
}

.landing-header .accent {
    color: var(--primary);
    position: relative;
    display: inline-block;
}

.landing-header .accent::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--primary);
    box-shadow: 0 0 10px var(--primary-glow);
}

.landing-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.landing-search {
    max-width: 600px;
    margin: 0 auto 4rem;
}

.landing-search .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input-large {
    width: 100%;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 1.1rem 1.5rem 1.1rem 3.5rem;
    color: var(--text-main);
    font-size: 1.05rem;
    font-family: inherit;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
}

.search-input-large:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.05);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
}

.search-icon-large {
    position: absolute;
    left: 1.5rem;
    color: var(--primary);
    font-size: 1.2rem;
    pointer-events: none;
}

/* Category Grid Card */
.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.category-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
}

.category-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
}

.category-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.category-card:hover::before {
    opacity: 1;
}

.category-icon-box {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    transition: all 0.3s ease;
}

.category-card:hover .category-icon-box {
    background: var(--primary);
    color: white;
    transform: rotate(5deg);
}

.category-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
}

.category-card p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
}

.card-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    font-size: 0.85rem;
    font-weight: 700;
    margin-top: auto;
    opacity: 0.8;
    transition: gap 0.3s ease, opacity 0.3s ease;
}

.category-card:hover .card-action {
    opacity: 1;
    gap: 0.75rem;
}

/* Tip Card Styling */
.docs-tip-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
}

.tip-icon {
    font-size: 1.5rem;
    color: var(--secondary);
    background: rgba(6, 182, 212, 0.1);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.tip-content h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
}

.tip-content p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
}

.tip-content code {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-main);
    padding: 0.15rem 0.35rem;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.85rem;
}

/* Animation utilities */
.animate-fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUpEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.landing-header.animate-fade-in {
    animation-delay: 0.1s;
}
.landing-search.animate-fade-in {
    animation-delay: 0.2s;
}
.categories-grid.animate-fade-in {
    animation-delay: 0.3s;
}
.docs-tip-card.animate-fade-in {
    animation-delay: 0.4s;
}

@keyframes fadeInUpEffect {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 968px) {
    .docs-sidebar {
        position: fixed;
        left: 0;
        top: 70px;
        height: calc(100vh - 70px);
        transform: translateX(-100%);
        z-index: 95;
    }
    
    .docs-sidebar.mobile-open {
        transform: translateX(0);
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
    }
    
    .sidebar-backdrop {
        display: block;
    }
    
    .mobile-sidebar-toggle {
        display: flex;
    }
}

@media (max-width: 768px) {
    .docs-content {
        padding: 1.5rem 1.5rem 3rem 1.5rem;
    }
    
    .breadcrumbs {
        padding: 0 1.5rem;
    }
}
</style>
