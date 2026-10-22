<template>
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
        <!-- Zeigarnik Effect: Top Scroll Progress Bar -->
        <div class="scroll-progress-track">
            <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
        </div>

        <div class="header-container">
            <div class="brand-group" @click="goHome">
                <div class="logo-orb">
                    <span class="orb-core">RC</span>
                    <span class="orb-ring"></span>
                </div>
                <div class="logo-meta">
                    <span class="logo-text">RAENARD<span class="accent">.CRUZ</span></span>
                    <span class="logo-sub">Full-Stack & AI Architect</span>
                </div>
            </div>

            <!-- Desktop Nav -->
            <nav class="nav">
                <a href="#" class="nav-link" :class="{ active: activeSection === 'hero' && !isKnowledgeBase }" @click.prevent="navigateToSection('hero')">
                    Overview
                </a>
                <a href="#projects" class="nav-link" :class="{ active: activeSection === 'projects' && !isKnowledgeBase }" @click.prevent="navigateToSection('projects')">
                    <i class="pi pi-video nav-icon"></i> Projects & Demos
                    <span class="nav-badge">3</span>
                </a>
                <a href="#skills" class="nav-link" :class="{ active: activeSection === 'skills' && !isKnowledgeBase }" @click.prevent="navigateToSection('skills')">
                    <i class="pi pi-sitemap nav-icon"></i> 3D Stack
                </a>
                <a href="#knowledge-base" class="nav-link" :class="{ active: isKnowledgeBase }">
                    <i class="pi pi-book nav-icon"></i> Knowledge Base
                </a>
            </nav>

            <!-- Right Actions: Discovery HUD + Theme Toggle + CTA -->
            <div class="header-actions">
                <!-- Zeigarnik Discovery Tracker -->
                <div class="discovery-pill-wrapper" v-if="!isKnowledgeBase">
                    <button
                        class="discovery-pill"
                        @click="showDiscoveryMenu = !showDiscoveryMenu"
                        v-tooltip.bottom="'Your exploration progress (Click to jump)'"
                    >
                        <span class="discovery-ring">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path
                                    class="circle-bg"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    class="circle"
                                    :stroke-dasharray="`${discoveryPercentage}, 100`"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <i class="pi pi-compass compass-icon"></i>
                        </span>
                        <span class="discovery-label">{{ visitedCount }}/{{ checkpoints.length }} Explored</span>
                    </button>

                    <transition name="pop">
                        <div v-if="showDiscoveryMenu" class="discovery-dropdown" @click.stop>
                            <div class="discovery-header">
                                <span>Interactive Journey</span>
                                <span class="discovery-pct">{{ discoveryPercentage }}%</span>
                            </div>
                            <p class="discovery-hint">Explore all sections to unlock the full architectural tour:</p>
                            <ul class="checkpoint-list">
                                <li
                                    v-for="cp in checkpoints"
                                    :key="cp.id"
                                    class="checkpoint-item"
                                    :class="{ visited: visitedSections[cp.id] }"
                                    @click="jumpToCheckpoint(cp)"
                                >
                                    <i :class="visitedSections[cp.id] ? 'pi pi-check-circle' : 'pi pi-circle'"></i>
                                    <div class="cp-info">
                                        <span class="cp-title">{{ cp.label }}</span>
                                        <span class="cp-sub">{{ cp.sub }}</span>
                                    </div>
                                    <i class="pi pi-arrow-right cp-go"></i>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>

                <!-- Theme Toggle -->
                <button
                    class="theme-btn"
                    @click="toggleTheme"
                    :aria-label="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                    v-tooltip.bottom="theme === 'dark' ? 'Switch to Warm Daylight Theme' : 'Switch to Obsidian 3D Theme'"
                >
                    <i :class="theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"></i>
                </button>

                <a href="#contact" class="contact-btn" @click.prevent="navigateToSection('contact')">
                    <span class="status-dot"></span>
                    <span>Let's Talk</span>
                </a>

                <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
                    <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Nav Overlay -->
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="mobile-nav-overlay" @click="closeMobileMenu">
                <nav class="mobile-nav" @click.stop>
                    <a href="#" class="mobile-nav-link" @click.prevent="navigateToSection('hero')">Overview</a>
                    <a href="#projects" class="mobile-nav-link" @click.prevent="navigateToSection('projects')">Projects & Video Demos</a>
                    <a href="#skills" class="mobile-nav-link" @click.prevent="navigateToSection('skills')">3D Technical Stack</a>
                    <a href="#knowledge-base" class="mobile-nav-link" @click="closeMobileMenu">Knowledge Base</a>
                    <a href="#contact" class="mobile-nav-link contact-btn-mobile" @click.prevent="navigateToSection('contact')">Let's Talk</a>
                </nav>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const currentHash = ref(window.location.hash)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('hero')
const showDiscoveryMenu = ref(false)
const theme = ref(document.documentElement.getAttribute('data-theme') || 'dark')

const checkpoints = [
    { id: 'hero', label: '01. Neural 3D Hero', sub: 'Interactive WebGL & Persona Lens' },
    { id: 'projects', label: '02. Video Demo Theater', sub: 'ClarifAI, Devotion, Oasi & Floowsynk' },
    { id: 'skills', label: '03. 3D Skill Ecosystem', sub: 'Interactive Orbital Tech Matrix' },
    { id: 'contact', label: '04. Connect & Docs', sub: 'Knowledge Base & Direct Contact' }
]

const visitedSections = reactive({
    hero: true,
    projects: false,
    skills: false,
    contact: false
})

const isKnowledgeBase = computed(() => currentHash.value.startsWith('#knowledge-base'))

const visitedCount = computed(() => Object.values(visitedSections).filter(Boolean).length)
const discoveryPercentage = computed(() => Math.round((visitedCount.value / checkpoints.length) * 100))

const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('portfolio-theme', theme.value)
}

const updateHash = () => {
    currentHash.value = window.location.hash
}

const handleScroll = () => {
    const scrollTop = window.scrollY
    isScrolled.value = scrollTop > 20

    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0

    if (isKnowledgeBase.value) return

    const sectionIds = ['hero', 'projects', 'skills', 'contact']
    for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= 100) {
                activeSection.value = id
                visitedSections[id] = true
            }
        }
    }
}

const navigateToSection = (id) => {
    closeMobileMenu()
    showDiscoveryMenu.value = false
    if (isKnowledgeBase.value) {
        window.location.hash = '#'
        setTimeout(() => {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 120)
    } else {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            visitedSections[id] = true
        } else if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

const jumpToCheckpoint = (cp) => {
    navigateToSection(cp.id)
}

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}

const goHome = () => {
    window.location.hash = '#'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMobileMenu()
}

const closeDropdownOutside = (e) => {
    if (!e.target.closest('.discovery-pill-wrapper')) {
        showDiscoveryMenu.value = false
    }
}

onMounted(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
        theme.value = savedTheme
        document.documentElement.setAttribute('data-theme', savedTheme)
    }
    window.addEventListener('hashchange', updateHash)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', closeDropdownOutside)
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('hashchange', updateHash)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('click', closeDropdownOutside)
})
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: var(--glass-bg);
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);
    border-bottom: 1px solid var(--glass-border);
    transition: all 0.3s ease;
}

.header-scrolled {
    height: 68px;
    background: var(--glass-bg-strong);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.scroll-progress-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.04);
    overflow: hidden;
}

.scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    box-shadow: 0 0 12px var(--primary);
    transition: width 0.1s ease-out;
}

.header-container {
    width: 100%;
    max-width: 1340px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.brand-group {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    cursor: pointer;
    user-select: none;
}

.logo-orb {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0, 242, 254, 0.15));
    border: 1px solid var(--glass-border-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--primary);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.brand-group:hover .logo-orb {
    transform: rotate(-6deg) scale(1.06);
    box-shadow: 0 0 20px var(--primary-glow);
}

.logo-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
}

.logo-text {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 1.05rem;
    color: var(--text-main);
}

.logo-text .accent {
    color: var(--primary);
}

.logo-sub {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
}

.nav {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.35rem;
    border-radius: 999px;
    border: 1px solid var(--glass-border);
}

.nav-link {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.86rem;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    position: relative;
}

.nav-icon {
    font-size: 0.8rem;
    opacity: 0.85;
}

.nav-badge {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #05080f;
    font-weight: 800;
    padding: 0.05rem 0.4rem;
    border-radius: 999px;
}

.nav-link:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
    color: var(--primary);
    background: var(--primary-glow);
    box-shadow: inset 0 0 0 1px var(--glass-border-hover);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

/* Discovery Pill */
.discovery-pill-wrapper {
    position: relative;
}

.discovery-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.38rem 0.8rem 0.38rem 0.45rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
}

.discovery-pill:hover {
    border-color: var(--primary);
    background: var(--primary-glow);
}

.discovery-ring {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circular-chart {
    width: 24px;
    height: 24px;
    transform: rotate(-90deg);
}

.circle-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.12);
    stroke-width: 3.5;
}

.circle {
    fill: none;
    stroke: var(--primary);
    stroke-width: 3.5;
    stroke-linecap: round;
    transition: stroke-dasharray 0.4s ease;
}

.compass-icon {
    position: absolute;
    font-size: 0.65rem;
    color: var(--primary);
}

.discovery-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 300px;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border-hover);
    border-radius: 20px;
    padding: 1.15rem;
    box-shadow: var(--card-shadow);
    z-index: 1100;
}

.discovery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--text-main);
    margin-bottom: 0.35rem;
}

.discovery-pct {
    font-family: var(--font-mono);
    color: var(--primary);
    font-size: 0.85rem;
}

.discovery-hint {
    font-size: 0.76rem;
    color: var(--text-muted);
    margin-bottom: 0.85rem;
}

.checkpoint-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.checkpoint-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.55rem 0.7rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

.checkpoint-item:hover {
    background: var(--primary-glow);
    border-color: var(--glass-border-hover);
}

.checkpoint-item i:first-child {
    font-size: 0.95rem;
    color: var(--text-dim);
}

.checkpoint-item.visited i:first-child {
    color: var(--primary);
}

.cp-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.cp-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-main);
}

.cp-sub {
    font-size: 0.68rem;
    color: var(--text-muted);
}

.cp-go {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.checkpoint-item:hover .cp-go {
    opacity: 1;
    transform: translateX(3px);
}

.theme-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
}

.theme-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: rotate(15deg);
}

.contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 1.2rem;
    background: linear-gradient(135deg, var(--primary), #059669);
    border-radius: 999px;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.86rem;
    text-decoration: none;
    box-shadow: 0 4px 18px var(--primary-glow);
    transition: all 0.25s ease;
}

.contact-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--primary-glow);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a7f3d0;
    box-shadow: 0 0 8px #ffffff;
    animation: pulseGlow 2s infinite;
}

.mobile-menu-btn {
    display: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--glass-border);
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    z-index: 1100;
    color: var(--text-main);
}

/* Mobile Nav */
.mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(24px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.mobile-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
}

.mobile-nav-link {
    color: var(--text-main);
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.4rem;
    transition: color 0.2s ease;
}

.mobile-nav-link:hover {
    color: var(--primary);
}

.contact-btn-mobile {
    padding: 0.75rem 2rem;
    background: var(--primary);
    color: #fff;
    border-radius: 999px;
}

.pop-enter-active, .pop-leave-active {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.pop-enter-from, .pop-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
}

@media (max-width: 1080px) {
    .discovery-label {
        display: none;
    }
    .discovery-pill {
        padding: 0.35rem;
    }
}

@media (max-width: 900px) {
    .nav, .contact-btn {
        display: none;
    }
    .mobile-menu-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
}
</style>