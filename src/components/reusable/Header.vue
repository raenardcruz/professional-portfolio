<template>
    <header class="header">
        <div class="header-container">
            <div class="logo" @click="goHome">
                <i class="pi pi-user logo-icon"></i>
                <span class="logo-text">PORT<span class="accent">FOLIO</span></span>
            </div>
            
            <!-- Desktop Nav -->
            <nav class="nav">
                <a href="#" class="nav-link" :class="{ 'active': currentHash === '' || currentHash === '#' }">Home</a>
                <a href="#skills" class="nav-link" :class="{ 'active': currentHash === '#skills' }">Skills</a>
                <a href="#projects" class="nav-link" :class="{ 'active': currentHash === '#projects' }">Projects</a>
                <a href="#knowledge-base" class="nav-link" :class="{ 'active': currentHash.startsWith('#knowledge-base') }">Knowledge Base</a>
                <a href="#contact" class="nav-link contact-btn">Contact Me</a>
            </nav>

            <div class="mobile-menu-btn" @click="toggleMobileMenu">
                <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
            </div>
        </div>

        <!-- Mobile Nav Overlay -->
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="mobile-nav-overlay" @click="closeMobileMenu">
                <nav class="mobile-nav" @click.stop>
                    <a href="#" class="mobile-nav-link" :class="{ 'active': currentHash === '' || currentHash === '#' }" @click="closeMobileMenu">Home</a>
                    <a href="#skills" class="mobile-nav-link" :class="{ 'active': currentHash === '#skills' }" @click="closeMobileMenu">Skills</a>
                    <a href="#projects" class="mobile-nav-link" :class="{ 'active': currentHash === '#projects' }" @click="closeMobileMenu">Projects</a>
                    <a href="#knowledge-base" class="mobile-nav-link" :class="{ 'active': currentHash.startsWith('#knowledge-base') }" @click="closeMobileMenu">Knowledge Base</a>
                    <a href="#contact" class="mobile-nav-link contact-btn" @click="closeMobileMenu">Contact Me</a>
                </nav>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentHash = ref(window.location.hash)
const mobileMenuOpen = ref(false)

const updateHash = () => {
    currentHash.value = window.location.hash
}

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}

const goHome = () => {
    window.location.hash = '#'
    closeMobileMenu()
}

onMounted(() => {
    window.addEventListener('hashchange', updateHash)
})

onUnmounted(() => {
    window.removeEventListener('hashchange', updateHash)
})
</script>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--glass-border);
    }

    .header-container {
        width: 100%;
        max-width: 1200px;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .logo-icon {
        font-size: 1.5rem;
        color: var(--primary);
    }

    .logo-text {
        font-weight: 800;
        letter-spacing: 2px;
        font-size: 1.25rem;
        color: var(--text-main);
    }

    .logo-text .accent {
        color: var(--primary);
        position: relative;
    }

    .logo-text .accent::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary);
    }

    .nav {
        display: flex;
        align-items: center;
        gap: 2.5rem;
    }

    .nav-link {
        color: var(--text-main);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        position: relative;
        opacity: 0.8;
    }

    .nav-link:hover {
        opacity: 1;
        color: var(--primary);
    }

    .nav-link.active {
        opacity: 1;
        color: var(--primary);
    }

    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary);
        box-shadow: 0 0 8px var(--primary-glow);
    }

    .nav-link.contact-btn {
        padding: 0.6rem 1.5rem;
        background: var(--primary);
        border-radius: 50px;
        color: white;
        opacity: 1;
        box-shadow: 0 4px 15px var(--primary-glow);
    }

    .nav-link.contact-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px var(--primary-glow);
        background: var(--secondary);
    }

    .mobile-menu-btn {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1100;
        color: var(--text-main);
        transition: color 0.3s ease;
    }

    .mobile-menu-btn:hover {
        color: var(--primary);
    }

    /* Mobile Navigation styles */
    .mobile-nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(244, 241, 234, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1050;
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .mobile-nav-link {
        color: var(--text-main);
        text-decoration: none;
        font-weight: 600;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        position: relative;
        opacity: 0.8;
    }

    .mobile-nav-link:hover, .mobile-nav-link.active {
        opacity: 1;
        color: var(--primary);
        transform: scale(1.1);
    }

    .mobile-nav-link.contact-btn {
        padding: 0.8rem 2rem;
        font-size: 1.25rem;
    }

    /* Transition Animations */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        .mobile-menu-btn {
            display: block;
        }
    }
</style>